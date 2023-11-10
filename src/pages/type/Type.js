import React, { useEffect } from "react";
import "./Type.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

const Type = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToNewStudent = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/new-student");
    }, 600);
  };

  const navigateToCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/course");
    }, 600);
  };

  const navigateToSetExam = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/set-exam-detail");
    }, 600);
  };

  const navigateToSetResult = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/select-result");
    }, 600);
  };

  const navigateToStudent = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/student-course");
    }, 600);
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <div className="type-section">
        <div className="appbar-header">
          <h2>Admin Panel</h2>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch(SetLoading(true));
              setTimeout(() => {
                dispatch(SetLoading(false));
                navigate("/");
              }, 600);
            }}
          >
            Logout
          </button>
        </div>

        <div className="type-parent">
          <div className="type-child">
            <div className="type-parent" onClick={navigateToNewStudent}>
              <div className="type-square">
                <p>Add Students</p>
              </div>
            </div>

            <div className="type-parent">
              <div className="type-square" onClick={navigateToCourse}>
                <p> Course & Exam Password</p>
              </div>
            </div>

            <div className="type-parent">
              <div className="type-square" onClick={navigateToSetExam}>
                <p>Exam Set</p>
              </div>
            </div>

            <div className="type-parent">
              <div className="type-square" onClick={navigateToSetResult}>
                <p>Result Set</p>
              </div>
            </div>

            <div className="type-parent">
              <div className="type-square" onClick={navigateToStudent}>
                <p>Student Enrollment Number</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Type;
