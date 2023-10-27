import React from "react";
import "./DeleteAllCourse.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
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
        url: "http://localhost:9000/api/courses/get-course",
        data: {
          courseName: name,
        },
      });
      const response = await axios({
        method: "delete",
        url: `http://localhost:9000/api/courses/delete-course/${result.data.data._id}`,
      });
      getAllCoursesName();
      console.log(response);
      dispatch(SetLoading(false));
      //   console.log(result.data.data._id);
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/delete-course-status");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
    // console.log(name)
  };

  const deleteSubject = async (name) => {
    // const result = await axios({
    //     method: "post",
    //     url: "http://localhost:9000/api/courses/get-course",
    //     data: {
    //       courseName: name,
    //     },
    //   });
    //   console.log(result)
    dispatch(SetCurrentUser({
        courseName : name
    }))
    navigate("/delete-subject");
  };

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/name-Course-all",
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
              <div className="delete-course-square" onClick={() => deleteSubject(name)}>
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
