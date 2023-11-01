import React, { useEffect } from "react";
import "./StudentAddSuccess.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";

function StudentAddSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moreStudentButton = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/new-student");
    }, 600);
  };

  const home = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
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
        <h2>Student Add Status</h2>
      </div>
      <div className="sas-parent">
        <div className="sas-item-container">
          <img src="/img/success.png" alt="success" />

          <div className="sas-item-heading">Student Added successfully</div>

          <div className="sas-item-label">
            Great News! Student Addes Successfully
          </div>
        </div>
      </div>
      <div className="sas-submit-button-parent">
        <div className="sas-cancel-button" onClick={moreStudentButton}>
          <p>Add More Student</p>
        </div>
        <button class="button" onClick={home}>
          Home
        </button>
      </div>
    </div>
  );
}

export default StudentAddSuccess;
