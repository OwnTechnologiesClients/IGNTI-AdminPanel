import React from "react";
import "./AddCourse.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { SetCurrentUser } from "../../../redux/userSlice";
import { message } from "antd";

function AddCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState();
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFees] = useState("");
  const arr = [];
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  const addSubject = async () => {
    if (selectedCategory > 0) {
      for (let i = 1; i <= selectedCategory; i++) {
        arr.push({
          semesterNumber: i,
          subjects: [],
        });
      }
      try {
        dispatch(SetLoading(true))
        const response = await axios({
            method: "post",
            url: "http://localhost:9000/api/courses/add-course",
            data: {
              courseName: courseName,
              noOfSemester: selectedCategory,
              duration: duration,
              fees: fee,
              semesters: arr,
            },
          });
          dispatch(SetLoading(false));
        //   console.log(response);
          if(response.data.success) {
            message.success(response.data.message);
            dispatch(SetCurrentUser({
                courseName: courseName
            }))
            navigate("/add-subject");
          }
          else {
            throw new Error(response.data.message);
          }
      } catch (error) {
        dispatch(SetLoading(false));
      message.error(error.message);

      }
    }
  };

  const navigateToContacts = () => {
    navigate("/test-subjects");
  };

  return (
    <div>
      <div className="course-section">
        <div className="course-appbar-header">
          <h2>Add Course</h2>
        </div>

        <div className="add-course-parent">
          <div className="course-duration-section">
            {/* -------------- Course Name ----------------- */}
            <div className="ac-userid-section">
              <p>Course Name</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
                placeholder=""
              />
            </div>

            {/* -------------- Duration ----------------- */}

            <div className="ac-userid-section">
              <p>Duration</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="semester-fee-section">
            {/* -------------- No of semester ----------------- */}
            <div className="ac-userid-section">
              <p>No Of Semesters</p>

              <div className="semester-dropdown">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategoryChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            {/* -------------- Fees ----------------- */}

            <div className="ac-userid-section">
              <p>Fees</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={fee}
                onChange={(e) => {
                  setFees(e.target.value);
                }}
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="save-course-detail-button-parent">
          <button class="button" onClick={addSubject}>
            Save Course Detail & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
