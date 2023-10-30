import React, { useEffect, useState } from "react";
import "./EditCoursePreview.css";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import axios from "axios";

function EditCoursePreview() {
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

  const navigateToSuccessUpdateCourse = () => {
    // 👇️ navigate to /contacts
    navigate("/update-course-status");
  };
  const cancelButton = () => {
    // 👇️ navigate to /contacts
    navigate("/add-course");
  };

  const getDetails = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/get-course",
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
          <h2>Edit Course Preview</h2>
        </div>
        <div className="ecp-parent">
          <div className="ecp-item-container">
            <div className="ecp-item-heading">{course.courseName}</div>
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
        <div className="ecp-submit-button-parent">
          <div className="ecp-cancel-button" onClick={cancelButton}>
            <p>Cancel</p>
          </div>
          <button class="button" onClick={navigateToSuccessUpdateCourse}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCoursePreview;
