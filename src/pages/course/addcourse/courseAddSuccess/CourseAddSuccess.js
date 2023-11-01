import React, { useEffect } from "react";
import "./CourseAddSuccess.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";

function CourseAddSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const home = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
    }, 600);
  };

  const addMoreCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/add-course");
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
        <h2>Course Status</h2>
      </div>
      <div className="cas-parent">
        <div className="cas-item-container">
          <img src="/img/success.png" alt="success" />

          <div className="cas-item-heading">Course Added successfully</div>

          <div className="cas-item-label">
            Great News! Course Addes Successfully
          </div>
        </div>
      </div>
      <div className="cas-submit-button-parent">
        <div className="cas-cancel-button" onClick={addMoreCourse}>
          <p>Add More Course</p>
        </div>
        <button class="button" onClick={home}>
          Home
        </button>
      </div>
    </div>
  );
}

export default CourseAddSuccess;
