import React, { useEffect } from "react";
import "./AddSubject.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";

function AddSubject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [courseName, setCourseName] = useState(id);
  const [duration, setDuration] = useState("");
  const [arr, setArr] = useState([]);

  const navigateToCoursePreview = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend-5bgl.onrender.com/api/subjects/add-subject",
        data: {
          courseName: courseName,
          semesterNumber: selectedCategory,
          newSubjects: [
            {
              subjectName: duration,
            },
          ],
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        getSemester();
        message.success(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const navigate = useNavigate();

  const navigateToContacts = () => {
    try {
      arr.map((data, index) => {
        if (data.subjects.length === 0) {
          throw new Error(`Add minimum one subject in ${index + 1} semester`);
        }
      });
      dispatch(SetLoading(true));
      setTimeout(() => {
        dispatch(SetLoading(false));
        navigate(`/course-preview/${id}`);
      }, 600);
    } catch (error) {
      // dispatch(SetLoading(false));
      message.error(error.message);
    }
    // console.log(arr);
    // dispatch(SetLoading(true));
    // setTimeout(() => {
    //   dispatch(SetLoading(false));
    //   navigate(`/course-preview/${id}`);
    // }, 600);
  };

  const getSemester = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend-5bgl.onrender.com/api/courses/get-course",
        data: {
          courseName: id,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setArr(response.data.data.semesters);
        setSelectedCategory(response.data.data.semesters[0].semesterNumber);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    setDuration("");
  }, [selectedCategory]);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
    getSemester();
  }, []);

  return (
    <div>
      <div className="subject-section">
        <div className="course-appbar-header">
          <h2>Add Subject</h2>
        </div>

        <div className="add-subject-parent">
          <div className="subject-duration-section">
            {/* -------------- Course Name ----------------- */}
            <div className="as-userid-section">
              <p>Course Name</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                value={courseName}
                disabled
              />
            </div>

            {/* -------------- Subject ----------------- */}

            <div className="as-userid-section">
              <p>Subject</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="semester-fee-section">
            {/* -------------- semester ----------------- */}
            <div className="as-userid-section">
              <p>Select Semester For Add Subject</p>

              <div className="as-semester-dropdown">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  {arr.map((item, index) => {
                    return <option value={`${index + 1}`}>{index + 1}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="add-subject-button-parent">
              <button class="button" onClick={navigateToCoursePreview}>
                Add Subject
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="cs-submit-button-parent">
          {/* <div className="cs-secondary-button">
            <p>Save Subject Details</p>
          </div> */}
          <button class="button" onClick={navigateToContacts}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
