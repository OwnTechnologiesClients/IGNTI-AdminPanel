import React, { useEffect } from "react";
import { message } from "antd";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigateToType = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://backend.ignti.com/api/admins/login",
        data: {
          userName: userId,
          password: password,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("adminToken", response.data.data);
        navigate("/type");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/type");
    }
  }, []);

  return (
    <div className="login-section">
      <div className="login-appbar-header">
        <h2>Admin Panel</h2>
      </div>

      <div className="login-square">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <div className="login-card-parent">
          <div className="userid-section">
            <p>UserName</p>

            <input
              type="text"
              autocomplete="off"
              className="form-control"
              name="title"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>

          <div className="userid-section">
            <p>Password</p>

            <input
              type="password"
              autocomplete="off"
              className="form-control"
              name="title"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="login-button-parent">
              <button class="button" onClick={navigateToType}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
