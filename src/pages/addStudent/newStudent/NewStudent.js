import React from "react";
import axios from "axios";
import "./NewStudent.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";

function NewStudent() {
  const [courses, setCourses] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addStudentButton = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory === "") {
        throw new Error("course not selected");
      }
      if (file === null) {
        throw new Error("No file is chosen! Please select the file.");
      }
      if (
        firstname === "" ||
        emailAddress === "" ||
        fatherName === "" ||
        dob === "" ||
        contactNumber === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        address == ""
      ) {
        throw new Error("Please fill all details");
      }
      const formData = new FormData();
      formData.append("fileName", file);
      formData.append("studentName", firstname);
      formData.append("email", emailAddress);
      formData.append("fatherName", fatherName);
      formData.append("dateOfBirth", dob);
      formData.append("mobileNumber", contactNumber);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);
      formData.append("address", address);
      formData.append("courseName", selectedCategory);

      dispatch(SetLoading(true));
      const result = await axios.post(
        "https://igti-backend.onrender.com/api/students/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const response = await axios({
        method: "post",
        url: "https://igti-backend.onrender.com/api/students/get-student-id",
        data: {
          email: emailAddress,
        },
      });
      dispatch(SetLoading(false));
      if (result.data.success && response.data.success) {
        message.success(result.data.message);
        navigate(`/profile-preview/${response.data.data._id}`);
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

  function handleContactChange(event) {
    setContactNumber(event.target.value);
  }

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend.onrender.com/api/courses/name-Course-all",
      });
      dispatch(SetLoading(false));
      console.log(response.data.data);
      if (response.data.success) {
        setCourses(response.data.data);
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
    getAllCoursesName();
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
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="First Name"
          />

          {/* ------------ emailAddress Input textfield -------------------- */}
          <input
            type="email"
            className="form-control"
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
            value={fatherName}
            onChange={(e) => {
              setFatherName(e.target.value);
            }}
            placeholder="Father Name"
          />

          {/* ------------ DOB textfield -------------------- */}
          <div className="dob-course">
            <input
              type="date"
              className="form-control custom-date-input"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
              placeholder="Date Of Birth"
            />

            <div className="add-course-dropdown">
              <select
                name="category-list"
                id="category-list-1"
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

          {/* ------------ contact Number Input textfield -------------------- */}
          <input
            type="number"
            className="form-control"
            value={contactNumber}
            onChange={(e) => {
              // setContactNumber(e.target.valu((e);
              handleContactChange(e);
            }}
            placeholder="Contact Number"
          />

          {/* ------------ City Input textfield -------------------- */}
          <input
            type="text"
            className="form-control"
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
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="State"
          />

          {/* ------------ Pincode Input textfield -------------------- */}
          <input
            type="number"
            className="form-control"
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
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Enter Full Address"
          />

          {/* ------------ Upload Image textfield -------------------- */}
          <input
            type="file"
            className="form-control"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setFile(e.target.files[0]);
            }}
            placeholder="Upload Image"
            accept="image/*"
          />

          {/* ------------ Select Course textfield -------------------- */}

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
