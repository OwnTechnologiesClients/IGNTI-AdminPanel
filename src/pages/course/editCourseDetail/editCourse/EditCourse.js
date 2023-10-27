import React, { useEffect } from "react";
import "./EditCourse.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";

function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { currentUser } = useSelector((state) => state.users);
  if (currentUser == null) {
    currentUser = {
      courseName: "",
    };
  }
  // console.log(currentUser)
  const [courseName, setCourseName] = useState(currentUser.courseName);
  const [duration, setDuration] = useState("");
  const [fee, setFees] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const cancel = () => {
    navigate("/all-course");
  };
  const updateCourseDetail = async () => {
    try {
      dispatch(SetLoading(true));
      const result = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/get-course",
        data: {
          courseName: courseName,
        },
      });
      // console.log(result.data.data._id);
      const response = await axios({
        method: "put",
        url: `http://localhost:9000/api/courses/update-course/${result.data.data._id}`,
        data: {
          noOfSemester: selectedCategory,
          duration: duration,
          fees: fee,
        },
      });
      dispatch(SetLoading(false));
      console.log(response);
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/edit-course-preview");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.courseName === "") {
      navigate("/all-course");
    }
  }, []);
  return (
    <div>
      <div className="edit-course-section">
        <div className="course-appbar-header">
          <h2>Edit Course</h2>
        </div>

        <div className="edit-course-parent">
          <div className="edit-course-duration-section">
            {/* -------------- Course Name ----------------- */}
            <div className="edit-userid-section">
              <p>Course Name</p>

              {/* ------------ User Id Input textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={courseName}
                disabled
              />
            </div>

            {/* -------------- Duration ----------------- */}

            <div className="edit-userid-section">
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

          <div className="edit-semester-fee-section">
            {/* -------------- No of semester ----------------- */}
            <div className="edit-userid-section">
              <p>No Of Semesters</p>

              <div className="edit-semester-dropdown">
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

            <div className="edit-userid-section">
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
      <div className="edit-submit-button-parent">
        <div className="cas-cancel-button" onClick={cancel}>
          <p>Cancel</p>
        </div>
        <button class="button" onClick={updateCourseDetail}>
          Update Course Detail & Continue
        </button>
      </div>
    </div>
  );
}

export default EditCourse;
