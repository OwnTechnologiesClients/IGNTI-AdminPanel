import React, { useEffect } from "react";
import "./ExamPublishSuccess.css";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function ExamPublishSuccess() {
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
      navigate("/set-exam-detail");
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
        <h2>Exam Published Status</h2>
      </div>
      <div className="exam-published-parent">
        <div className="exam-published-item-container">
          <img src="/img/success.png" alt="success" />

          <div className="exam-published-item-heading">
            Exam Published successfully
          </div>

          <div className="exam-published-item-label">
            Great News! Exam Published Successfully
          </div>
        </div>
      </div>
      <div className="exam-published-submit-button-parent">
        <div
          className="exam-published-cancel-button"
          onClick={updateMoreCourse}
        >
          <p>Add More Exams</p>
        </div>
        <button class="button" onClick={home}>
          Home
        </button>
      </div>
    </div>
  );
}

export default ExamPublishSuccess;
