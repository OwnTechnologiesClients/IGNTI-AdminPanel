import React, { useEffect } from "react";
import "./DeleteSubject.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function DeleteSubject() {
  let { currentUser } = useSelector((state) => state.users);
  if (currentUser == null) {
    currentUser = {
      courseName: "",
    };
  }
  // console.log(currentUser)
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [courseName, setCourseName] = useState(currentUser.courseName);
  const [subjects, setSubjects] = useState([]);
  const [arr, setArr] = useState([]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const navigate = useNavigate();

  const cancel = () => {
    navigate("/delete-all-course");
  };
  const proceed = async () => {
    const response = await axios({
      method: "post",
      url: "http://localhost:9000/api/courses/get-course",
      data: {
        courseName: courseName,
      },
    });
    //   console.log(response.data.data);
    if (response.data.success) {
      setArr(response.data.data.semesters);
    }
    const result = await axios({
      method: "post",
      url: "http://localhost:9000/api/subjects/get-subject",
      data: {
        courseName: courseName,
        semesterNumber: selectedCategory,
      },
    });
    if (result.data.success) {
      setSubjects(result.data.data.subjects);
    }
    // console.log();
    // const response = await axios({
    //   method: "delete",
    //   url: `http://localhost:9000/api/courses/delete-course/${result.data.data._id}`,
    // });
    // console.log(response);
    // navigate('/delete-course-status');
  };

  const deleteSubject = async (name) => {
    const response = await axios({
        method: "delete",
        url: "http://localhost:9000/api/subjects/delete-one-subject",
        data: {
            courseName: courseName,
            semesterNumber: selectedCategory,
            subjectName: name
        },
      });
        console.log(response.data);
    // navigate("/delete-subject");
  };

  useEffect(() => {
    if (currentUser.courseName === "") {
      navigate("/delete-all-course");
    }
  }, []);

  useEffect(() => {
    // console.log("hello")
    // console.log(selectedCategory)
    proceed();
  }, [selectedCategory]);

  return (
    <div>
      <div>
        <div className="course-appbar-header">
          <h2>Delete Subject</h2>
        </div>

        <div className="delete-subject-parent">
          <div className="delete-subject-section">
            {/* -------------- Course Name ----------------- */}
            <div className="delete-subject-course-name-section">
              <p>Course Name</p>

              {/* ------------ Course name textfield -------------------- */}
              <input
                type="text"
                className="form-control"
                name="title"
                value={courseName}
                disabled
                placeholder=""
              />
            </div>

            {/* -------------- No of semester ----------------- */}
            <div className="delete-subject-course-name-section">
              <p>No Of Semesters</p>

              <div className="delete-subject-semester-dropdown">
                <select
                  name="category-list"
                  id="category-list"
                  onChange={handleCategoryChange}
                >
                  {arr.map((item, index) => {
                    return <option value={`${index + 1}`}>{index + 1}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        {subjects.map((subject) => {
          return (
            <div className="delete-subject-list-section">
              <div className="delete-subject-square">
                <p>{subject.subjectName}</p>
              </div>
              <img
                src="/img/delete.png"
                alt="success"
                onClick={() => deleteSubject(subject.subjectName)}
              />
            </div>
          );
        })}
      </div>
      <div className="delete-subject-primary-button-parent">
        <div className="delete-subject-secondary-button" onClick={cancel}>
          <p>Cancel</p>
        </div>
        <button class="button" onClick={proceed}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default DeleteSubject;
