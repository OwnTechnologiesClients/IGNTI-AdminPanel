import React from "react";
import "./DeleteAllCourse.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";
import { SetCurrentUser } from "../../../../redux/userSlice";

function DeleteAllCourse() {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const editCourse = async (name) => {
    try {
      dispatch(SetLoading(true));
      const result = await axios({
        method: "post",
        url: "https://igti-backend-5bgl.onrender.com/api/courses/get-course",
        data: {
          courseName: name,
        },
      });
      const response = await axios({
        method: "delete",
        url: `https://igti-backend-5bgl.onrender.com/api/courses/delete-course/${result.data.data._id}`,
      });
      const res = await axios({
        method: "post",
        url: `https://igti-backend-5bgl.onrender.com/api/examSets/delete-exams-set`,
        data: {
          courseName: name,
        },
      });
      getAllCoursesName();
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setTimeout(() => {
          navigate("/delete-course-status");
        }, 1000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const deleteSubject = async (name) => {
    navigate(`/delete-subject/${name}`);
  };

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend-5bgl.onrender.com/api/courses/name-Course-all",
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
      <div className="delete-course-section">
        <div className="course-appbar-header">
          <h2>Delete Course</h2>
        </div>
        {courses.map((name) => {
          return (
            <div className="delete-course-parent">
              <div
                className="delete-course-square"
                onClick={() => deleteSubject(name)}
              >
                <p>{name}</p>
              </div>
              <img
                src="/img/delete.png"
                alt="success"
                onClick={() => editCourse(name)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteAllCourse;
