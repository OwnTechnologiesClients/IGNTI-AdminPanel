import React from "react";
import "./AddSubject.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";

function AddSubject() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [selectedCategory, setSelectedCategory] = useState();
  const [courseName, setCourseName] = useState(currentUser.courseName);
  const [duration, setDuration] = useState("");

  const navigateToCoursePreview = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/subjects/add-subject",
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
    //   console.log(response);
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
      // 👇️ navigate to /contacts
      // navigate("/course-preview");
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
    navigate("/course-preview");
  };

//   const [fee, setFees] = useState("");

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
                name="title"
                value={courseName}
                placeholder=""
              />
            </div>

            {/* -------------- Subject ----------------- */}

            <div className="as-userid-section">
              <p>Subject</p>

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
            {/* -------------- semester ----------------- */}
            <div className="as-userid-section">
              <p>No Of Semesters</p>

              <div className="as-semester-dropdown">
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
          <div className="cs-secondary-button">
            <p>Save Subject Details</p>
          </div>
          <button class="button" onClick={navigateToContacts}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
