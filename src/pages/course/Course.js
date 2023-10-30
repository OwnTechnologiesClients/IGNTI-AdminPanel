import React, { useEffect } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();

  const navigateToAddCourse = () => {
    // 👇️ navigate to /contacts
    navigate("/add-course");
  };

  const navigateToEditCourse = () => {
    // 👇️ navigate to /contacts
    navigate("/all-course");
  };

  const navigateToDeleteCourse = () => {
    // 👇️ navigate to /contacts
    navigate("/delete-all-course");
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="course-section">
        <div className="course-appbar-header">
          <h2>Admin Panel</h2>
        </div>

        <div className="course-parent">
          <div className="course-child">
            <div className="course-parent">
              <div className="course-square" onClick={navigateToAddCourse}>
                <p>Add New Course</p>
              </div>
            </div>

            <div className="course-parent">
              <div className="course-square" onClick={navigateToEditCourse}>
                <p>Edit Course</p>
              </div>
            </div>

            <div className="course-parent">
              <div className="course-square" onClick={navigateToDeleteCourse}>
                <p>Delete Course</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
