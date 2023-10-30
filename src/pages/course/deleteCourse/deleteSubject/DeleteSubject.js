import React, { useEffect } from "react";
import "./DeleteSubject.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SetLoading } from "../../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

function DeleteSubject() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [courseName, setCourseName] = useState(id);
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
    try {
      dispatch(SetLoading(true))
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/get-course",
        data: {
          courseName: courseName,
        },
      });
      dispatch(SetLoading(false))
      if (response.data.success) {
        message.success(response.data.message);
        setArr(response.data.data.semesters);
      }
      else {
        throw new Error(response.data.message);
      }
      dispatch(SetLoading(true))
      const result = await axios({
        method: "post",
        url: "http://localhost:9000/api/subjects/get-subject",
        data: {
          courseName: courseName,
          semesterNumber: selectedCategory,
        },
      });
      dispatch(SetLoading(false))
      if (result.data.success) {
        setSubjects(result.data.data.subjects);
      }
      else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const deleteSubject = async (name) => {
    try {
      dispatch(SetLoading(true));
      const result = await axios({
        method: "delete",
        url: "http://localhost:9000/api/subjects/delete-one-subject",
        data: {
          courseName: courseName,
          semesterNumber: selectedCategory,
          subjectName: name,
        },
      });
      dispatch(SetLoading(false));
      if (result.data.success) {
        message.success(result.data.message);
      }
      else {
        throw new Error(result.data.message);
      }
      proceed();
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getStatus = () => {
    navigate('/delete-course-status');
  };


  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
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
        <button class="button" onClick={getStatus}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default DeleteSubject;
