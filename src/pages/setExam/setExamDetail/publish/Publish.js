import './Publish.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"



function Publish() {
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

  const publishButton = () => {
    navigate('/exam-published');
  };



  return (
    <div >
      <div className='course-appbar-header'>
        <h2>Fundamentals of Computer</h2>
      </div>

      <div>


        <div className='publish-quesions'>

          <p>1. Question #1</p>

          {/* -------------- Answer One ------------------------- */}
          <div className='set-answer-form'>
            <label >
              <input
                type="radio"
                value="OptionOne"
                checked={optionOne === "OptionOne"}
                onChange={onValueChangeOne} />
              <span>Answer Choice #1</span>

            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionTwo"
                checked={optionTwo === "OptionTwo"}
                onChange={onValueChangeTwo} />
              <span>Answer Choice #2</span>
            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionThree"
                checked={optionThree === "OptionThree"}
                onChange={onValueChangeThree} />
              <span>Answer Choice #3</span>
            </label>
            <br />

            <label >
              <input
                type="radio"
                value="OptionFour"
                checked={optionFour === "OptionFour"}
                onChange={onValueChangeFour} />
              <span>Answer Choice #4</span>
            </label>
            <br />
          </div>
        </div>



      </div>


      <div className='publish-quesions'>

        <p>2. Question #2</p>

        {/* -------------- Answer One ------------------------- */}
        <div className='set-answer-form'>
          <label >
            <input
              type="radio"
              value="OptionOne"
              checked={optionOne === "OptionOne"}
              onChange={onValueChangeOne} />
            <span>Answer Choice #1</span>

          </label>
          <br />

          <label >
            <input
              type="radio"
              value="OptionTwo"
              checked={optionTwo === "OptionTwo"}
              onChange={onValueChangeTwo} />
            <span>Answer Choice #2</span>
          </label>
          <br />

          <label >
            <input
              type="radio"
              value="OptionThree"
              checked={optionThree === "OptionThree"}
              onChange={onValueChangeThree} />
            <span>Answer Choice #3</span>
          </label>
          <br />

          <label >
            <input
              type="radio"
              value="OptionFour"
              checked={optionFour === "OptionFour"}
              onChange={onValueChangeFour} />
            <span>Answer Choice #4</span>
          </label>
          <br />
        </div>
      </div>



      <div className='publish-button'>
        <button class="button" onClick={publishButton}>PUBLISH</button>
      </div>
    </div>


  )
}

export default Publish