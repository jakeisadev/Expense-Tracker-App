import { React, useState, useEffect } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import Spinner from "../components/Spinner";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      // We are waiting for the program to register the user
      // Show loading spinner in the meantime.
      setLoading(true);
      // Post user values to the database 
      await axios.post("/api/users/register", values);
      // Values are in thedatabase, no need to load the page anymore
      setLoading(false);
      // Alert user the account creation was successful
      message.success("Registration successful!");
    } catch (error) {
      // Alert user that they were not able to post values to the database
      message.error("Something went wrong.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // If user is registered, load the home page
    if (localStorage.getItem("cash-watch-user")) {
        navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="register">
        {/* If the page is loading, show the spinner */}
        {loading && <Spinner />}
        {/* Main div to hold content */}
        <div className="row justify-content-center align-items-center w-100 h-100">
          {/* Holds the two col-md-5's which split the page evenly in half */}
          <div className="col-md-5">
            {/* Splitting the left side of page in half */}
            <div className="lottie">
              {/* Outside element to bring lively animation to the page */}
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
              {/* Remove styling and controls from the lottie player to activate */}
            </div>
          </div>
          <div className="col-md-4">
            {/* Splitting right side of the page in half */}
            <Form layout="vertical" onFinish={onFinish}>
              <h1>Let's register an account for Cash Watch</h1>
              {/* Using 'vertical' form class to align this form instead of wasting space in the CSS file */}
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              {/* Form component idea taken from antd library */}
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/login">
                  {/* We have to make this a linkable element just in case a user is already registered */}
                  Already Registered? Click here to Login.
                </Link>
                <button className="primary secondary" type="submit">
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
