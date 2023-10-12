import './SetQuestions.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"



function SetQuestions() {
  const [optionOne, setOptionOne] = useState("OptionOne")
  const [optionTwo, setOptionTwo] = useState("OptionTwo")
  const [optionThree, setOptionThree] = useState("OptionThree")
  const [optionFour, setOptionFour] = useState("OptionFour")

  const [question, setQuestion] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");


  // Function to handle the change in radio button selection
  function onValueChangeOne(event) {
    // Updating the state with the selected radio button's value
    setOptionOne(event.target.value)
  }

  function onValueChangeTwo(event) {
    // Updating the state with the selected radio button's value
    setOptionTwo(event.target.value)
  }

  function onValueChangeThree(event) {
    // Updating the state with the selected radio button's value
    setOptionThree(event.target.value)
  }

  function onValueChangeFour(event) {
    // Updating the state with the selected radio button's value
    setOptionFour(event.target.value)
  }

  const navigate = useNavigate();

  const navigateToContacts = () => {
    navigate('/test-subjects-submit');
  };
  return (
    <div >
      <div className='course-appbar-header'>
        <h2>Fundamentals of Computer</h2>
      </div>

      <div className='quesion-section'>


        <div className='set-quesions'>

          <p>1. Question #1</p>
          <input type="text" className="form-control" name="title"
            value={question}
            onChange={(e) => { setQuestion(e.target.value) }}
            placeholder="" />



          {/* -------------- Answer One ------------------------- */}
          <div className='set-answer-form'>
            <label >
              <input
                type="radio"
                value="OptionOne"
                checked={optionOne === "OptionOne"}
                onChange={onValueChangeOne} />
              <input type="text" className="form-control" name="title"
                value={answerOne}
                onChange={(e) => { setAnswerOne(e.target.value) }}
                placeholder="Answer One" />
            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionTwo"
                checked={optionTwo === "OptionTwo"}
                onChange={onValueChangeTwo} />
              <input type="text" className="form-control" name="title"
                value={answerTwo}
                onChange={(e) => { setAnswerTwo(e.target.value) }}
                placeholder="Answer Two" />
            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionThree"
                checked={optionThree === "OptionThree"}
                onChange={onValueChangeThree} />
              <input type="text" className="form-control" name="title"
                value={answerThree}
                onChange={(e) => { setAnswerThree(e.target.value) }}
                placeholder="Answer Three" />
            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionFour"
                checked={optionFour === "OptionFour"}
                onChange={onValueChangeFour} />
              <input type="text" className="form-control" name="title"
                value={answerFour}
                onChange={(e) => { setAnswerFour(e.target.value) }}
                placeholder="Answer Four" />
            </label>
            <br />


          </div>

          <div className='set-answer-add-button-parent'>
            <button class="button" onClick={navigateToContacts}>Continue</button>
          </div>

          <div className='set-answer-check-all-Ques-Ans-parent'>
            <button class="button" onClick={navigateToContacts}>Check All Added Questions</button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default SetQuestions