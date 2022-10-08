import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AddEditTransaction from "../components/AddEditTransaction";
import Analytics from "../components/Analytics";
import "../resources/transactions.css";
import Spinner from "../components/Spinner";
import axios from "axios";
import { message, Select, Table } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
// import { response } from "express";

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cash-watch-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong.");
    }
  };

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/transactions/delete-transaction",
        {
          transactionId : record._id
        }
      );
      message.success('Transaction Deleted Successfully')
      getTransactions()
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (record) => <label>{moment(record).format("YYYY-MM-DD")}</label>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record)=> {
        return <div>
          <EditOutlined onClick={()=> {
            setSelectedItemForEdit(record)
            setShowAddEditTransactionModal(true)
          }}/>
          <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
        </div>
      }
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom Filter</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-2 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`mx-2 ${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
                size={30}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics">
        {viewType === "table" ? (
          <div className="table">
            <Table
              columns={columns}
              dataSource={transactionsData}
              rowKey="_id"
            />
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
