import React, { useEffect } from "react";
import { message } from "antd";

import { useState } from "react";
import "./StudentResult.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import axios from "axios";

const StudentResult = () => {
  let [data, setData] = useState([]);
  if (data.length === 0) {
    data = [
      {
        subjectResults: [
          {
            subjectName: "",
            totalNumQuestions: "",
            numCorrectAnswers: "",
          },
        ],
      },
    ];
  }
  const { id, semesterNumber, courseName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [user, setUser] = useState();
  if (!user) {
    user = {
      courseName: "",
      studentName: "",
      fatherName: "",
      dateOfBirth: "",
    };
  }

  const publishButton = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/resultSets/update-result-set-id",
        data: {
          courseName: courseName,
          semesterNumber: semesterNumber,
          studentId: id,
          updatedSubjectResults: data[0].subjectResults,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        getAllStudentIds();
        message.success(response.data.message);
      } else {
        throw Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
    // 👇️ navigate to /contacts
    // navigate("/all-students");
  };

  const updatedButton = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/resultSets/update-declared",
        data: {
          courseName: courseName,
          semesterNumber: semesterNumber,
          studentId: id,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        getAllStudentIds();
        message.success(response.data.message);
      } else {
        throw Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
    // 👇️ navigate to /contacts
    // navigate("/all-students");
  };

  const homeButton = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
    }, 600);
  };

  let totalCorrectAnswers = 0;
  let totalTotalNumQuestions = 0;

  data[0].subjectResults.forEach((subjectResult) => {
    totalCorrectAnswers =
      totalCorrectAnswers + +subjectResult.numCorrectAnswers;
    totalTotalNumQuestions =
      totalTotalNumQuestions + subjectResult.totalNumQuestions;
  });

  const roundedNumber = (totalCorrectAnswers / totalTotalNumQuestions) * 100;
  const overallPercentage = roundedNumber.toFixed(2);

  // const overallPercentage =
  //   (totalCorrectAnswers / totalTotalNumQuestions) * 100;

  const getAllStudentIds = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/resultSets/get-result-set-id",
        data: {
          courseName: courseName,
          semesterNumber: semesterNumber,
          studentId: id,
        },
      });

      const result = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/get-student-id-detail",
        data: {
          id: id,
        },
      });

      dispatch(SetLoading(false));
      if (response.data.success && result.data.success) {
        message.success(response.data.message);
        message.success(result.data.message);
        setData(response.data.data);
        setUser(result.data.data);
      } else {
        throw Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const handleInputChange = (resIndex, event) => {
    if (!data[0].isDeclared) {
      const updatedData = [...data];
      updatedData[0].subjectResults[resIndex].numCorrectAnswers =
        event.target.value;
      setData(updatedData);
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
      <div className="result-section">
        <div className="result-square">
          <div className="square-header">
            <h2>STUDENT DETAILS</h2>
          </div>
          <div className="result-card-parent">
            {/* <h2>BECOME A MEMBER</h2> */}
            <div className="border-1"></div>
            <div className="result-user-information-section">
              <p>{user.courseName}</p>
            </div>

            <div className="student-information-section">
              <div className="section-one">
                <div className="student-info">
                  <p1>Name: </p1>
                  <p2>{user.studentName}</p2>
                </div>

                <div className="student-info">
                  <p1>Father Name: </p1>
                  <p2>{user.fatherName}</p2>
                </div>

                <div className="student-info">
                  <p1>Date Of Birth: </p1>
                  <p2>{user.dateOfBirth}</p2>
                </div>

                <div className="student-info">
                  <p1>Enroll No:</p1>
                  <p2>{user.enrollNo}</p2>
                </div>
              </div>

              <div className="section-two">
                <img
                  src={`http://localhost:9000/public/${user.imageFile}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="square-dashboard">
            <h2>DASHBOARD</h2>

            <div className="course-table">
              <div className="dashboard">
                <div className="parent-row">
                  <span>S.No</span>
                  <span>Exam Name</span>
                  <span>Maximum Marks</span>
                  <span>Obtained Marks</span>
                  <span>Grade</span>
                </div>

                {data[0].subjectResults.map((res, resIndex) => {
                  return (
                    <div className="child-row">
                      <span>{resIndex + 1}</span>
                      <span>{res.subjectName}</span>
                      <span>{res.totalNumQuestions}</span>

                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={res.numCorrectAnswers}
                        onChange={(event) => handleInputChange(resIndex, event)}
                        placeholder="60"
                      />

                      {(res.numCorrectAnswers / res.totalNumQuestions) * 100 <=
                      30 ? (
                        <span>D</span>
                      ) : (res.numCorrectAnswers / res.totalNumQuestions) *
                          100 <=
                        50 ? (
                        <span>C</span>
                      ) : (res.numCorrectAnswers / res.totalNumQuestions) *
                          100 <=
                        80 ? (
                        <span>B</span>
                      ) : (
                        <span>A</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {overallPercentage <= 30 ? (
          <div className="percentage-square-dashboard-fail">
            <p1>Percentage : {overallPercentage}%</p1>

            <p1>Grade : D</p1>

            <p1>Result : Fail</p1>
          </div>
        ) : (
          <div className="percentage-square-dashboard">
            <p1>Percentage : {overallPercentage}%</p1>

            {overallPercentage <= 30 ? (
              <p1>Grade : D</p1>
            ) : overallPercentage <= 50 ? (
              <p1>Grade : C</p1>
            ) : overallPercentage <= 80 ? (
              <p1>Grade : B</p1>
            ) : (
              <p1>Grade : A</p1>
            )}

            <p1>Result : Pass</p1>
          </div>
        )}
      </div>

      {!data[0].isDeclared ? (
        <div className="publish-result-section" onClick={publishButton}>
          <div className="publish-result-button">
            <p>PUBLISH</p>
          </div>
        </div>
      ) : (
        <>
          <div className="publish-result-section">
            <div className="publish-result-button" onClick={homeButton}>
              <p>Result updated successfully(CONTINUE)</p>
            </div>
          </div>
          <div className="publish-result-section">
            <div className="publish-result-button" onClick={updatedButton}>
              <p>Click here for Updated Again</p>
            </div>
          </div>
        </>
      )}

      <div className="home-button-section" onClick={homeButton}>
        <div className="home-button">
          <p>HOME</p>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
