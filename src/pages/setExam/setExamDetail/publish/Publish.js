import "./Publish.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../redux/loaderSlice";
import { message } from "antd";
import axios from "axios";

function Publish() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dataString = searchParams.get("data");
  const initialData = JSON.parse(dataString);
  const data1String = searchParams.get("data1");
  const data1 = JSON.parse(data1String);

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  const [editedData, setEditedData] = useState([...data]);

  const toggleEditMode = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      setEditMode(!editMode);
      message.success("Update mode on");
    }, 400);
  };
  const updateData = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      setData([...editedData]);
      setEditMode(false);
      message.success("Data updated successfully");
    }, 400);
  };

  const navigate = useNavigate();

  const publishButton = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/examSets/add-exams-set",
        data: {
          courseName: data1.courseName,
          semesterNumber: data1.semesterNumber,
          subjectName: data1.subjectName,
          questions: data,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.removeItem("myVariable");
        navigate("/exam-published");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const handleQuestionTextChange = (index, newText) => {
    const updatedData = [...editedData];
    updatedData[index].questionText = newText;
    setEditedData(updatedData);
  };

  const handleOptionTextChange = (questionIndex, optionIndex, newText) => {
    const updatedData = [...editedData];
    updatedData[questionIndex].options[optionIndex].optionText = newText;
    setEditedData(updatedData);
  };

  const handleOptionTextChang = (questionIndex, optionIndex, newText) => {
    const updatedData = [...editedData];
    updatedData[questionIndex].correctOption = newText;
    setEditedData(updatedData);
  };

  const handleDeleteQuestion = (index) => {
    const updatedData = [...editedData];
    updatedData.splice(index, 1);
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      setEditedData(updatedData);
      message.success("Question deleted successfully");
    }, 400);
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="course-appbar-header">
        <h2>Fundamentals of Computer</h2>
      </div>

      <div className="grid-container">
        {editedData.map((item, index) => {
          return (
            <div className="grid-item" key={index}>
              <div className="publish-quesions">
                {editMode ? (
                  <div className="updated-question-1">
                    <p>({index + 1})</p>
                    <input
                      type="text"
                      value={item.questionText}
                      onChange={(e) => {
                        handleQuestionTextChange(index, e.target.value);
                      }}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <p>
                    {index + 1}. {item.questionText}?
                  </p>
                )}

                {/* -------------- Answer One ------------------------- */}
                <div className="set-answer-form">
                  {item.options.map((option, optionIndex) => {
                    return (
                      <div
                        className="updated-input-field-parent"
                        key={optionIndex}
                      >
                        {editMode ? (
                          <div className="updated-input-field">

                            <input
                              type="radio"
                              value={optionIndex + 1}
                              checked={optionIndex + 1 === +item.correctOption}
                              onChange={(e) => {
                                handleOptionTextChang(
                                  index,
                                  optionIndex,
                                  e.target.value
                                );
                              }}
                            />

                            <input
                              type="text"
                              value={option.optionText}
                              onChange={(e) => {
                                handleOptionTextChange(
                                  index,
                                  optionIndex,
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <label>
                              <input
                                type="radio"
                                value={optionIndex + 1}
                                checked={
                                  optionIndex + 1 === +item.correctOption
                                }
                              />
                              <span className="text">{option.optionText}</span>
                            </label>
                            <br />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="exam-publish-button">
        {editMode && (
          <button className="button" onClick={updateData}>
            Save Changes
          </button>
        )}
        {!editMode && (
          <button className="button" onClick={toggleEditMode}>
            Edit Fields
          </button>
        )}

        {!editMode && (
          <button className="button" onClick={publishButton}>
            PUBLISH
          </button>
        )}
      </div>
    </div>
  );
}

export default Publish;
