import React from "react";
import "./studentform.css";
import { useState } from "react";

const Studentform = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  return (
    <div>
      <div className="student-section-11">
        <div className="student-head1">
          <h2>Student Details</h2>
        </div>
        <div className="student-container1">
          <div className="student-form1">
            <input type="text" className="form-control-11" placeholder="Name" />
            <input
              type="text"
              className="form-control-11"
              placeholder="Father's Name"
            />
            <input
              type="text"
              className="form-control-11"
              placeholder="Mothers's Name"
            />

            <div className="date-course">
              <input
                type="date"
                className="form-control-11 custom-date-input"
                placeholder="Date Of Birth"
              />

              <div className="add-course-dropdowns">
                <select
                  name="category-list"
                  id="category-listss"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option disabled value="">
                    Select Course
                  </option>
                  {courses.map((course, index) => {
                    return <option value={course}>{course}</option>;
                  })}
                </select>
              </div>
            </div>

            <input
              type="number"
              className="form-control-11"
              placeholder="Contact Number"
            />
            <input
              type="email"
              className="form-control-11"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="form-control-11"
              placeholder=" Address"
            />

            <div className="date-course">
              <input
                type="texts"
                className="form-control-11"
                placeholder="State"
              />

              <input
                type="numbers"
                className="form-control-11"
                placeholder="Enter Pincode"
              />
            </div>

            <input
              type="file"
              className="form-control-11"
              placeholder="Upload Image"
              accept="image/*"
            />
          </div>
        </div>

        <div className="buttons-submitt">
          <button>Submit</button>
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Studentform;
