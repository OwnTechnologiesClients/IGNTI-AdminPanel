import React, { useEffect, useState } from "react";
import "./AllStudents.css";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import axios from "axios";

const AllStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseName, semesterNumber, subjectName } = useParams();
  const [id, setId] = useState([]);
  const [detail, setDetail] = useState([]);

  const navigateToStudentResult = (id) => {
    navigate(`/student-result/${id}/${semesterNumber}/${courseName}`);
  };

  const getDetailsById = async (x) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/get-student-id-detail",
        data: {
          id: x,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        // message.success(response.data.message);
        setDetail((prevDetail) => [...prevDetail, response.data.data]);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getAllStudentIds = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/resultSets/get-result-set",
        data: {
          courseName: courseName,
          semesterNumber: semesterNumber,
          subjectName: subjectName,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setId(response.data.data);
        response.data.data.map((xx) => {
          getDetailsById(xx);
        });
      } else {
        throw Error(response.data.message);
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
    getAllStudentIds();
  }, []);

  return (
    <div>
      <div className="course-appbar-header">
        <h2>All Students</h2>
      </div>

      <div className="grid-container">
        {id.map((value, index) => {
          return (
            <div className="grid-item" key={index}>
              <div>
                {detail[index] && (
                  <div
                    className="ph-course-parent"
                    onClick={() => navigateToStudentResult(value)}
                  >
                    <img
                      src={`http://localhost:9000/public/${detail[index].imageFile}`}
                      alt="success"
                    />
                    <div className="ph-course-detail">
                      <h3>Name: {detail[index].studentName}</h3>
                      <h3>EnrollNo : {detail[index].enrollNo}</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllStudents;
