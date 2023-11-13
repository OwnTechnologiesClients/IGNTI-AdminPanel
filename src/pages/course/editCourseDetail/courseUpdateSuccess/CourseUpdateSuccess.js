import React, { useEffect } from "react";
import "./CourseUpdateSuccess.css";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function CourseUpdateSuccess() {
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
      navigate("/all-course");
    }, 600);
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };

    // Clean up the event listener when the component unmounts
    return () => {
      window.onpopstate = null;
    };
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
