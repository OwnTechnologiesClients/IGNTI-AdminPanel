import React, { useEffect } from "react";
import "./CourseDeleteSuccess.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";

function CourseDeleteSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const home = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
    }, 600);
  };
  const updateMoreCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/delete-all-course");
    }, 600);
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className="course-appbar-header">
        <h2>Course Delete Status</h2>
      </div>
      <div className="cds-parent">
        <div className="cds-item-container">
          <img src="/img/success.png" alt="success" />

          <div className="cds-item-heading">Course Deleted successfully</div>

          <div className="cds-item-label">
            Great News! Course Deleted Successfully
          </div>
        </div>
      </div>
      <div className="cds-submit-button-parent">
        <div className="cds-cancel-button" onClick={updateMoreCourse}>
          <p>Delete More Course</p>
        </div>
        <button class="button" onClick={home}>
          Home
        </button>
      </div>
    </div>
  );
}

export default CourseDeleteSuccess;
