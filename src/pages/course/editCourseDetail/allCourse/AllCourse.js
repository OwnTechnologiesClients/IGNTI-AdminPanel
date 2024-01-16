import React, { useEffect } from "react";
import "./AllCourse.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoading } from "../../../../redux/loaderSlice";
import axios from "axios";

function AllCourse() {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editCourse = (name) => {
    navigate(`/edit-course/${name}`);
  };

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://backend.ignti.com/api/courses/name-Course-all",
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setCourses(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
    getAllCoursesName();
  }, []);

  return (
    <div>
      <div className="all-course-section">
        <div className="course-appbar-header">
          <h2>All Course</h2>
        </div>

        {courses.map((name) => {
          return (
            <div className="all-course-parent">
              <div
                className="all-course-square"
                onClick={() => editCourse(name)}
              >
                <p>{name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllCourse;
