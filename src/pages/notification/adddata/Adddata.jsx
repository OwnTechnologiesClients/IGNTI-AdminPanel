import React, { useState } from "react";
import "./adddata.css";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";

const Adddata = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    notification: "",
    notificationLink: "",
    youtubeLink: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("https://igti-backend.onrender.com/api/notification/add-notification", formData);
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setFormData({
          notification: "",
          notificationLink: "",
          youtubeLink: "",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="add-data-header">
        <div className="admin-panel-add-data">
          <p>Add data</p>
        </div>
      </div>
      <div className="add-data-bottom">
        <div className="add-data-form-notification">
          <p>Notification</p>
          <input
            type="text"
            className="form-link-1"
            name="notification"
            onChange={handleChange}
            value={formData.notification}
          />
        </div>
        <div className="add-data-form-notification">
          <p>Notification Link</p>
          <input
            type="text"
            className="form-link"
            name="notificationLink"
            onChange={handleChange}
            value={formData.notificationLink}
          />
        </div>
        <div className="add-data-form-notification">
          <p>Youtube Link</p>
          <input
            type="text"
            className="form-link"
            name="youtubeLink"
            onChange={handleChange}
            value={formData.youtubeLink}
          />
        </div>
      </div>

      <div>
        <button className="add-data-buttons" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Adddata;
