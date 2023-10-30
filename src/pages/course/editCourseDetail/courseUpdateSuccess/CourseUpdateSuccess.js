import React, { useEffect } from "react";
import "./CourseUpdateSuccess.css";
import { useNavigate } from "react-router-dom";

function CourseUpdateSuccess() {
  const navigate = useNavigate();

  const home = () => {
    // 👇️ navigate to /contacts
    navigate("/type");
  };
  const updateMoreCourse = () => {
    // 👇️ navigate to /contacts
    navigate("/all-course");
  };
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className="course-appbar-header">
        <h2>Course Update Status</h2>
      </div>
      <div className="cus-parent">
        <div className="cus-item-container">
          <img src="/img/success.png" alt="success" />

          <div className="cus-item-heading">Course Updated successfully</div>

          <div className="cus-item-label">
            Great News! Course Updated Successfully
          </div>
        </div>
      </div>
      <div className="cus-submit-button-parent">
        <div className="cus-cancel-button" onClick={updateMoreCourse}>
          <p>Update More Course</p>
        </div>
        <button class="button" onClick={home}>
          Home
        </button>
      </div>
    </div>
  );
}

export default CourseUpdateSuccess;
