import React from "react";
import axios from "axios";
import "./studentform.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";

function Studentform() {
  const location = useLocation();
  const studentData = location?.state?.studentData;

  const [courses, setCourses] = useState([]);
  const [firstname, setFirstname] = useState(studentData.studentName || "");
  const [emailAddress, setEmailAddress] = useState(studentData.email || "");
  const [contactNumber, setContactNumber] = useState(
    studentData.mobileNumber || ""
  );
  const [fatherName, setFatherName] = useState(studentData.fatherName || "");
  const [dob, setDob] = useState(studentData.dateOfBirth || "");
  const [state, setState] = useState(studentData.state || "");
  const [city, setCity] = useState(studentData.city || "");
  const [pincode, setPincode] = useState(studentData.pincode || "");
  const [address, setAddress] = useState(studentData.address || "");
  const [selectedCategory, setSelectedCategory] = useState(
    studentData.courseName || ""
  );
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReset = () => {
    setFirstname(studentData.studentName || "");
    setEmailAddress(studentData.email || "");
    setContactNumber(studentData.mobileNumber || "");
    setFatherName(studentData.fatherName || "");
    setDob(studentData.dateOfBirth || "");
    setState(studentData.state || "");
    setCity(studentData.city || "");
    setPincode(studentData.pincode || "");
    setAddress(studentData.address || "");
    setSelectedCategory(studentData.courseName || "");
  };

  const addStudentButton = async (e) => {
    e.preventDefault();
    try {
      // if (selectedCategory === "") {
      //   throw new Error("course not selected");
      // }
      // if (file === null) {
      //   throw new Error("No file is chosen! Please select the file.");
      // }
      if (
        firstname === "" ||
        emailAddress === "" ||
        fatherName === "" ||
        dob === "" ||
        contactNumber === "" ||
        city === "" ||
        state === "" ||
        pincode === "" ||
        address === ""
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
        `https://igti-backend.onrender.com/api/students/update/${studentData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(SetLoading(false));
      if (result.data.success) {
        message.success(result.data.message);
        navigate("/student-course")
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
    <div>
      <div className="student-section-11">
        <div className="student-head1">
          <h2>Student Details</h2>
        </div>
        <div className="student-container1">
          <div className="student-form1">
            <input
              type="text"
              className="form-control-11"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="Name"
            />

            <input
              type="email"
              className="form-control-11"
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
              placeholder="Email Address"
            />

            <input
              type="text"
              className="form-control-11"
              value={fatherName}
              onChange={(e) => {
                setFatherName(e.target.value);
              }}
              placeholder="Father Name"
            />

            <div className="date-course">
              <input
                type="date"
                className="form-control-11 custom-date-input"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
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
              value={contactNumber}
              onChange={(e) => {
                handleContactChange(e);
              }}
              placeholder="Contact Number"
            />

            <input
              type="text"
              className="form-control-11"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder="Enter City"
            />

            <div className="date-course">
              <input
                type="text"
                className="form-control-11"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                placeholder="State"
              />

              <input
                type="number"
                style={{ marginRight: "6vw" }}
                className="form-control-11"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
                placeholder="Enter Pincode"
              />
            </div>

            <input
              type="text"
              className="form-control-11"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Enter Full Address"
            />

            <input
              type="file"
              className="form-control-11"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setFile(e.target.files[0]);
              }}
              placeholder="Upload Image"
              accept="image/*"
            />
          </div>
        </div>

        <div className="buttons-submitt">
          <button onClick={(e) => addStudentButton(e)}>Update</button>
          <button onClick={() => handleReset()}>Reset</button>
          <button onClick={() => navigate("/student-course")}>Back</button>
        </div>
      </div>
    </div>

    // <button class="button" onClick={addStudentButton}>
    //   Add Student
    // </button>
  );
}

export default Studentform;
