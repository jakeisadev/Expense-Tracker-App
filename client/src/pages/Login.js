import { React, useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import Spinner from "../components/Spinner";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "cash-watch-user",
        JSON.stringify({...response.data , password:"" })
      );
      setLoading(false);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      setLoading(false)
      message.error("Login failed.");
    }
  };

  useEffect(() => {
    // If user is registered, load the home page
    if (localStorage.getItem("cash-watch-user")) {
        navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="register login">
        {loading && <Spinner />}
        {/* Main div to hold content */}
        <div className="row justify-content-center align-items-center w-100 h-100">
          {/* Holds the two col-md-5's which split the page evenly in half */}
          <div className="col-md-4">
            {/* Splitting right side of the page in half */}
            <Form layout="vertical" onFinish={onFinish}>
              <h1>Time to keep track!</h1>
              {/* Using 'vertical' form class to align this form instead of wasting space in the CSS file */}
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              {/* Form component idea taken from antd library */}
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/register">
                  {/* We have to make this a linkable element just in case a user is already Logined */}
                  Not Registered yet? Click here to Register.
                </Link>
                <button className="primary secondary" type="submit">
                  Login
                </button>
              </div>
            </Form>
          </div>
          <div className="col-md-5">
            {/* Splitting the left side of page in half */}
            <div className="lottie lottie-login">
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
        </div>
      </div>
    </div>
  );
}

export default Login;
