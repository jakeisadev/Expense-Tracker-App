const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const moment = require("moment");

router.post("/add-transaction", async function (req, res) {
  try {
    const { amount, type, category, date, reference, description, userid } =
      req.body;
    const newtransaction = new Transaction(req.body);
    newtransaction.save((err) => {
      if (err) console.log(err);
    });
    res.send("Transaction Added Successfully!");
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    const { amount, type, category, date, reference, description, userid } =
      req.body;
    await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
    res.send("Transaction Updated Successfully!");
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    const { amount, type, category, date, reference, description, userid } =
      req.body;
    await Transaction.findOneAndDelete({_id: req.body.transactionId})
    res.send("Transaction Updated Successfully!");
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom" ? {
        date: {
          $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
        },
      } : {
        date: {
          $gte: selectedRange[0],
          $lte: selectedRange[1] 
        }
      }),
      userid: req.body.userid,
      ...(type !== 'all' && {type})
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
