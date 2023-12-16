import React from "react";
import { Link } from "react-router-dom";
import "./notification.css";

const Notification = () => {
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
            <div className="notification-link">
              <p>Diploma in Computer Appilacation (DCA)</p>
              <img src="/img/delete.png" alt="" />
            </div>
            <div className="notification-link">
              <p>Diploma in Computer Appilacation (DCA)</p>
              <img src="/img/delete.png" alt="" />
            </div>
            <div className="notification-link">
              <p>Diploma in Computer Appilacation (DCA)</p>
              <img src="/img/delete.png" alt="" />
            </div>
          </div>
        </div>
        <div className="youtubelink-notification">
          <h5>Youtube Link</h5>
          <div className="notification">
            <div className="notification-link">
              <p>https://www.youtube.com</p>
              <img src="/img/delete.png" alt="" />
            </div>
            <div className="notification-link">
              <p>https://www.youtube.com</p>
              <img src="/img/delete.png" alt="" />
            </div>
            <div className="notification-link">
              <p>https://www.youtube.com</p>
              <img src="/img/delete.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
