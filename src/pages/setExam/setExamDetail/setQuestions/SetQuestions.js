import { message } from "antd";
import "./SetQuestions.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoading } from "../../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function SetQuestions() {
  const { courseName, semesterNumber, subjectName } = useParams();
  const data1 = {
    courseName: courseName,
    semesterNumber: semesterNumber,
    subjectName: subjectName,
  };
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [type, setType] = useState("1");

  const [question, setQuestion] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");

  function onValueChange(event) {
    setType(event.target.value);
  }

  useEffect(() => {
    const storedQuestions = localStorage.getItem("myVariable");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
    if (localStorage.getItem("myVariable") && JSON.parse(localStorage.getItem("myVariable")).length == 0) {
      getExistingQuestion();
    }if (!localStorage.getItem("myVariable")) {
      getExistingQuestion();
    }
  }, []);

  const navigate = useNavigate();

  const continueToPublish = () => {
    if (JSON.parse(localStorage.getItem("myVariable")).length === 0) {
      message.error("Please add minimum one question to proceed!");
    } else {
      const queryParams = new URLSearchParams();
      queryParams.append("data", JSON.stringify(questions));
      queryParams.append("data1", JSON.stringify(data1));
      const url = `/publish-questions?${queryParams.toString()}`;
      navigate(url);
    }
  };

  const areOptionsDistinct = (question) => {
    const optionTexts = question.options.map((option) => option.optionText);
    const optionSet = new Set(optionTexts);
    return optionSet.size === optionTexts.length;
  };

  const appendQuestion = (newQuestion) => {
    const questionExists = questions.some(
      (question) => question.questionText === newQuestion.questionText
    );
    if (questionExists) {
      console.log("Question already exists:", newQuestion.questionText);
      message.error(
        `("${newQuestion.questionText}") Question is already present! Try different one`
      );
    } else {
      const optionsDistinct = areOptionsDistinct(newQuestion);
      if (!optionsDistinct) {
        message.error("Some options are same! Please fill distinct value");
      } else {
        setQuestions([...questions, newQuestion]);
        message.success("Question added successfully");
      }
    }
  };

  const addQuestion = () => {
    dispatch(SetLoading(true));
    if (
      question === "" ||
      answerOne === "" ||
      answerTwo === "" ||
      answerThree === "" ||
      answerFour === ""
    ) {
      setTimeout(() => {
        dispatch(SetLoading(false));
        message.error("Please fill all details");
      }, 400);
    } else {
      const ques = {
        questionText: question,
        options: [
          {
            optionText: answerOne,
          },
          {
            optionText: answerTwo,
          },
          {
            optionText: answerThree,
          },
          {
            optionText: answerFour,
          },
        ],
        correctOption: type,
      };
      setTimeout(() => {
        dispatch(SetLoading(false));
        appendQuestion(ques);
        console.log(questions);
      }, 400);
    }
  };

  const getExistingQuestion = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/examSets/get-exams-set",
        data: {
          courseName: courseName,
          semesterNumber: semesterNumber,
          subjectName: subjectName,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        localStorage.setItem("myVariable", JSON.stringify(response.data.data));
        const storedQuestions2 = localStorage.getItem("myVariable");
        if (storedQuestions2) {
          setQuestions(JSON.parse(storedQuestions2));
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    localStorage.setItem("myVariable", JSON.stringify(questions));
  }, [questions]);

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

      <div className="quesion-section">
        <div className="set-quesions">
          <p> Question #{questions.length + 1}</p>
          <input
            type="text"
            className="form-control"
            name="title"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            placeholder="Enter Question"
          />

          {/* -------------- Answer One ------------------------- */}
          <div className="set-answer-form">
            <label>
              <input
                type="radio"
                value="1"
                checked={type === "1"}
                onChange={onValueChange}
              />
              <input
                type="text"
                className="form-control"
                name="title"
                value={answerOne}
                onChange={(e) => {
                  setAnswerOne(e.target.value);
                }}
                placeholder="Option One"
              />
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="2"
                checked={type === "2"}
                onChange={onValueChange}
              />
              <input
                type="text"
                className="form-control"
                name="title"
                value={answerTwo}
                onChange={(e) => {
                  setAnswerTwo(e.target.value);
                }}
                placeholder="Option Two"
              />
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="3"
                checked={type === "3"}
                onChange={onValueChange}
              />
              <input
                type="text"
                className="form-control"
                name="title"
                value={answerThree}
                onChange={(e) => {
                  setAnswerThree(e.target.value);
                }}
                placeholder="Option Three"
              />
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="4"
                checked={type === "4"}
                onChange={onValueChange}
              />
              <input
                type="text"
                className="form-control"
                name="title"
                value={answerFour}
                onChange={(e) => {
                  setAnswerFour(e.target.value);
                }}
                placeholder="Option Four"
              />
            </label>
            <br />
          </div>

          <div className="set-answer-add-button-parent">
            <button class="button" onClick={addQuestion}>
              Continue
            </button>
          </div>

          <div className="set-answer-check-all-Ques-Ans-parent">
            <button class="button" onClick={continueToPublish}>
              Check All Added Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetQuestions;
