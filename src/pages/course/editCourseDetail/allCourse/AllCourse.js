import React, { useEffect } from "react";
import "./AllCourse.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoading } from "../../../../redux/loaderSlice";
import axios from "axios";
import { SetCurrentUser } from "../../../../redux/userSlice";

function AllCourse() {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editCourse = (name) => {
    // console.log(name)
    dispatch(
      SetCurrentUser({
        courseName: name,
      })
    );
    navigate("/edit-course");
  };

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/name-Course-all",
      });
      dispatch(SetLoading(false));
      // console.log(response.data.data);
      if (response.data.success) {
        message.success(response.data.message);
        setCourses(response.data.data);
        // console.log(courses);
        // navigate("/add-subject");
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
