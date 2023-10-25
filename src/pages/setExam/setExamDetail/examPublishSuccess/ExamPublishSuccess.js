import React from 'react'
import './ExamPublishSuccess.css';
import { useNavigate } from "react-router-dom"

function ExamPublishSuccess() {
    const navigate = useNavigate();

    const home = () => {
        // 👇️ navigate to /contacts
        navigate('/type');
    };
    const updateMoreCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/set-exam-detail');
    };
    return (
        <div>
            <div className='course-appbar-header'>
                <h2>Exam Published Status</h2>
            </div>
            <div className='exam-published-parent'>
                <div className="exam-published-item-container">

                    <img src="/img/success.png" alt="success" />

                    <div className="exam-published-item-heading">
                        Exam Published successfully
                    </div>

                    <div className="exam-published-item-label">
                        Great News! Exam Published Successfully
                    </div>


                </div>



            </div>
            <div className='exam-published-submit-button-parent'>
                <div className='exam-published-cancel-button' onClick={updateMoreCourse}>
                    <p>Add More Exams</p>
                </div>
                <button class="button" onClick={home}>Home</button>

            </div>
        </div>
    )
}

export default ExamPublishSuccess