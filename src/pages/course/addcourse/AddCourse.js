import React, { useEffect } from "react";
import "./AddCourse.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { message } from "antd";

function AddCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFees] = useState("");
  const [pass, setPass] = useState("");
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
        if (courseName === "" || duration === "" || fee === "") {
          throw new Error("Please fill All Fields!");
        }
        dispatch(SetLoading(true));
        const response = await axios({
          method: "post",
          url: "https://igti-backend-5bgl.onrender.com/api/courses/add-course",
          data: {
            courseName: courseName,
            noOfSemester: selectedCategory,
            duration: duration,
            fees: fee,
            semesters: arr,
            coursePassword: pass,
          },
        });
        dispatch(SetLoading(false));
        if (response.data.success) {
          message.success(response.data.message);
          navigate(`/add-subject/${courseName}`);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        dispatch(SetLoading(false));
        message.error(error.message);
      }
    }
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
              <p>Duration In Years</p>

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

            <div className="edit-userid-section">
              <p>Password</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
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
