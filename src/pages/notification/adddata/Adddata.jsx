import React from "react";
import "./adddata.css";

const Adddata = () => {
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
          <input type="text"
          className="form-link-1"
           />
        </div>
        <div className="add-data-form-notification">
          <p>Notification Link</p>
          <input type="text"
          className="form-link" />
        </div>
        <div className="add-data-form-notification">
          <p>Youtube Link</p>
          <input type="text"
          className="form-link" />
        </div>
      </div>

      <div>
        <button  className="add-data-buttons">Submit</button>
      </div>
    </div>
  );
};

export default Adddata;
