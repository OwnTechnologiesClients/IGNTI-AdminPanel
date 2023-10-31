import React, { useEffect } from "react";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToAddCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/add-course");
    }, 600);
  };

  const navigateToEditCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/all-course");
    }, 600);
  };

  const navigateToDeleteCourse = () => {
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
