import React, { useEffect } from "react";
import "./SelectResultDetail.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SetLoading } from "../../../redux/loaderSlice";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";

function SelectResultDetail() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [arr, setArr] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [num, setNum] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleCategorySubject(event) {
    setSubject(event.target.value);
  }
  function handleCategorySemester(event) {
    setNum(event.target.value);
  }

  const navigate = useNavigate();

  const cancel = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
    }, 600);
  };
  const proceedToAllStudents = () => {
    if (subject == "" || !num || !selectedCategory) {
      message.error("Please fill all the details");
    } else {
      // navigate(`/set-questions/${selectedCategory}/${num}/${subject}`);
      navigate(`/all-students/${selectedCategory}/${num}/${subject}`);
    }
  };
  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/name-Course-all",
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setCourses(response.data.data);
        setSelectedCategory(response.data.data[0]);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getSemester = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/get-course",
        data: {
          courseName: selectedCategory,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setArr(response.data.data.semesters);
        setNum(response.data.data.semesters[0].semesterNumber);
        setSubject("");
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  const getSubject = async () => {
    try {
      dispatch(SetLoading(true));
      const result = await axios({
        method: "post",
        url: "http://localhost:9000/api/subjects/get-subject",
        data: {
          courseName: selectedCategory,
          semesterNumber: num,
        },
      });
      dispatch(SetLoading(false));
      if (result.data.success) {
        message.success(result.data.message);
        setSubjects(result.data.data.subjects);
        setSubject(result.data.data.subjects[0].subjectName);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      //   message.error(error.message);
    }
  };
  useEffect(() => {
    getSubject();
  }, [num]);
  useEffect(() => {
    getSemester();
  }, [selectedCategory]);
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
    if (localStorage.getItem("myVariable")) {
      localStorage.removeItem("myVariable");
    }
    getAllCoursesName();
  }, []);

  return (
    <div>
      <div className="set-result-section">
        <div className="course-appbar-header">
          <h2>Select Result</h2>
        </div>

        <div className="set-result-parent">
          <div className="set-result-duration-section">
            {/* -------------- Course Name ----------------- */}
            <div className="set-result-userid-section">
              <p>Course Name</p>

              {/* ------------ dropdown -------------------- */}
              <div className="set-result-dropdown-section">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  {courses.map((course) => {
                    return <option value={`${course}`}>{course}</option>;
                  })}
                </select>
              </div>
            </div>

            {/* -------------- Subject ----------------- */}

            <div className="set-result-userid-section">
              <p>Subject</p>

              {/* ------------ dropdown -------------------- */}
              <div className="set-result-dropdown-section">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategorySubject}
                  value={subject}
                >
                  <option value="" disabled>Select Subject</option>
                  {subjects.map((subject) => {
                    return (
                      <option value={`${subject.subjectName}`}>
                        {subject.subjectName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="set-result-semester-fee-section">
            {/* -------------- No of semester ----------------- */}
            <div className="set-result-userid-section">
              <p>No Of Semesters</p>

              <div className="set-result-dropdown-section">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategorySemester}
                  value={num}
                >
                  <option value="" disabled>Select Semester Number</option>
                  {arr.map((item, index) => {
                    return <option value={`${index + 1}`}>{index + 1}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="set-result-primary-button-parent">
        <div className="set-result-secondary-button" onClick={cancel}>
          <p>Cancel</p>
        </div>
        <button class="button" onClick={proceedToAllStudents}>
          Proceed To Set Result
        </button>
      </div>
    </div>
  );
}

export default SelectResultDetail;
