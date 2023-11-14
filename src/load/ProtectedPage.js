import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";
import axios from "axios";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  let effectMessage = true;

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "get",
        url: "http://localhost:9000/api/admins/get-current-user",
        headers: {
          authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        if (effectMessage) {
          effectMessage = false;
        }
        dispatch(SetCurrentUser(response.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      getCurrentUser();
    } else {
      navigate("/");
    }
  }, []);
  return currentUser && <div>{children}</div>;
}

export default ProtectedPage;
