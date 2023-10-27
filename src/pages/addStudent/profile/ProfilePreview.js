import React from "react";
import { useState } from "react";
import "./ProfilePreview.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePreview = () => {
  const { currentUser } = useSelector((state) => state.users);
  console.log(currentUser);
  const navigate = useNavigate();

  const submit = () => {
    // 👇️ navigate to /contacts
    navigate("/student-added");
  };
  const cancel = () => {
    // 👇️ navigate to /contacts
    navigate("/type");
  };

  return (
    <div>
      <div className="preview-section">
        <div className="preview-square">
          <div className="preview-square-header">
            <h2>Student Profile Preview</h2>
          </div>
          <div className="preview-card-parent">
            {/* <h2>BECOME A MEMBER</h2> */}
            <div className="border-1"></div>
            <div className="preview-user-information-section">
              <p>{currentUser.courseName}</p>
            </div>

            <div className="preview-student-information-section">
              <div className="preview-section-one">
                <div className="preview-student-info">
                  <p1>Name: </p1>
                  <p2>{currentUser.studentName}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Father Name: </p1>
                  <p2>{currentUser.fatherName}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Date Of Birth: </p1>
                  <p2>{currentUser.dateOfBirth}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>City:</p1>
                  <p2>{currentUser.city}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>State:</p1>
                  <p2>{currentUser.state}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Pincode:</p1>
                  <p2>{currentUser.pincode}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>User Id:</p1>
                  <p2>Neha008792</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Password:</p1>
                  <p2>Neha1234</p2>
                </div>
              </div>

              <div className="preview-section-two">
                <img src="/img/teacher1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="preview-submit-button-parent">
        <div className="preview-cancel-button" onClick={cancel}>
          <p>Cancel</p>
        </div>
        <button class="button" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
