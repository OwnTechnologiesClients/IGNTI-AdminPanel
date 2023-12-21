import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./notification.css";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [youTubeLinks, setYoutubeLinks] = useState([]);

  const deleteData = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post(
        `https://igti-backend-5bgl.onrender.com/api/notification/delete-notification/${id}`
      );
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        getData();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post(
        "https://igti-backend-5bgl.onrender.com/api/notification/get-notification"
      );
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setNotifications(response.data.notifications);
        setYoutubeLinks(response.data.youtubeLinks);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="not-header">
        <div className="admin-panel">
          <p>All Notification & Youtube Link</p>
        </div>
        <Link className="link" to="/add-data">
          <p>&#10010;</p>
        </Link>
      </div>

      <div className="bottom-header">
        <div className="youtubelink-notification">
          <h5>Notfication</h5>
          <div className="notification">
            {notifications?.map((notificationData, notificationIndex) => {
              return (
                <div key={notificationIndex} className="notification-link">
                  <p>{notificationData.notification}</p>
                  <img onClick={() => deleteData(notificationData._id)} src="/img/delete.png" alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="youtubelink-notification">
          <h5>Youtube Link</h5>
          <div className="notification">
            {youTubeLinks?.map((youTubeLinkData, youTubeLinkIndex) => {
              return (
                <div key={youTubeLinkIndex} className="notification-link">
                  <p>{youTubeLinkData.youtubeLink}</p>
                  <img onClick={() => deleteData(youTubeLinkData._id)} src="/img/delete.png" alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
