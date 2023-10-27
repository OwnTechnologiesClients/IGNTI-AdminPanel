import React from "react";
import axios from "axios";
import "./NewStudent.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { SetCurrentUser } from "../../../redux/userSlice";

function NewStudent() {
  const [firstname, setFirstname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addStudentButton = async () => {
    try {
      dispatch(SetLoading(true));
      const result = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/register",
        data: {
          studentName: firstname,
          email: emailAddress,
          fatherName: fatherName,
          dateOfBirth: dob,
          mobileNumber: contactNumber,
          city: city,
          state: state,
          pincode: pincode,
          address: address,
          courseName: selectedCategory,
        },
      });
      console.log(result);
      dispatch(SetLoading(false));
      if (result.data.success) {
        message.success(result.data.message);
        dispatch(
          SetCurrentUser({
            studentName: firstname,
            email: emailAddress,
            fatherName: fatherName,
            dateOfBirth: dob,
            mobileNumber: contactNumber,
            city: city,
            state: state,
            pincode: pincode,
            address: address,
            courseName: selectedCategory,
          })
        );
        navigate("/profile-preview");
      } else {
        throw new Error(result.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="new-student-detail-parent">
      <div className="new-student-query-square">
        <div className="new-student-square-header">
          <h2>Student Details</h2>
        </div>
        <div className="new-student-query-card-parent">
          {/* ------------ First name Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="First Name"
          />

          {/* ------------ emailAddress Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            placeholder="Email Address"
          />

          {/* ------------ father Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={fatherName}
            onChange={(e) => {
              setFatherName(e.target.value);
            }}
            placeholder="Father Name"
          />

          {/* ------------ DOB textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            placeholder="Date Of Birth"
          />

          {/* ------------ contact Number Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            placeholder="Contact Number"
          />

          {/* ------------ City Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="Enter City"
          />

          {/* ------------ State Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="State"
          />

          {/* ------------ Pincode Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
            placeholder="Enter Pincode"
          />

          {/* ------------ Address Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Enter Full Address"
          />

          {/* ------------ Select Course textfield -------------------- */}
          <input
            type="text"
            className="form-control"
            name="title"
            value="Image"
            onChange={(e) => {
              // setAddress(e.target.value);
            }}
            placeholder="Upload Image"
          />

          {/* ------------ Upload Image textfield -------------------- */}

          <div className="add-course-dropdown">
            <select
              name="category-list"
              id="category-list"
              onChange={handleCategoryChange}
            >
              <option value="">Select Course</option>
              <option value="Diploma in Computer Application (DCA)">
                Diploma in Computer Application (DCA)
              </option>
              <option value="Advance Diploma in Computer Application (ADCA)-Old">
                Advance Diploma in Computer Application (ADCA)-Old
              </option>
              <option value="X-Ray and ECG Technology">
                X-Ray and ECG Technology
              </option>
              <option value="Certificate in Desktop Publication (CDTP)">
                Certificate in Desktop Publication (CDTP)
              </option>
            </select>
          </div>

          <div className="new-student-signup-button">
            <button class="button" onClick={addStudentButton}>
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewStudent;
