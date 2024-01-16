import React, { useEffect, useState } from "react";
import "./CoursePreview.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import axios from "axios";
import { message } from "antd";

function CoursePreview() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  let [course, setCourse] = useState();
  if (!course) {
    course = {
      courseName: "",
      semesters: [
        {
          semesterNumber: "",
          subjects: [
            {
              subjectName: "",
            },
          ],
        },
      ],
    };
  }

  const navigateToSuccessAddCourse = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/course-add-successful");
    }, 600);
  };

  const cancelButton = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/add-course");
    }, 600);
  };

  const getDetails = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://backend.ignti.com/api/courses/get-course",
        data: {
          courseName: id,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setCourse(response.data.data);
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
    getDetails();
  }, []);

  return (
    <div>
      <div>
        <div className="course-appbar-header">
          <h2>Course Preview</h2>
        </div>
        <div className="cp-parent">
          <div className="cp-item-container">
            <div className="cp-item-heading">{course.courseName}</div>

            {course.semesters.map((semester) => {
              return (
                <>
                  <div className="cp-item-label">
                    SEMESTER - {semester.semesterNumber}
                  </div>

                  {semester.subjects.map((subject) => {
                    return (
                      <>
                        <div className="cp-item-label">
                          {subject.subjectName}
                        </div>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
        <div className="cp-submit-button-parent">
          <div className="cp-cancel-button" onClick={cancelButton}>
            <p>Cancel</p>
          </div>
          <button class="button" onClick={navigateToSuccessAddCourse}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursePreview;
