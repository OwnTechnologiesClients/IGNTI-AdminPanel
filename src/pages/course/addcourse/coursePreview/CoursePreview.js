import React from 'react'
import './CoursePreview.css';
import { useNavigate } from "react-router-dom"

function CoursePreview() {
    const navigate = useNavigate();

    const navigateToSuccessAddCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/course-add-successful');
    };
    const cancelButton = () => {
        // 👇️ navigate to /contacts
        navigate('/add-course');
    };
    return (
        <div>
            <div >
                <div className='course-appbar-header'>
                    <h2>Course Preview</h2>
                </div>
                <div className='cp-parent'>
                    <div className="cp-item-container">
                        <div className="cp-item-heading">
                            Diploma in Computer Application (DCA)
                        </div>


                        <div className="cp-item-label">
                            SEMESTER - I
                        </div>

                        <div className="cp-item-label">
                            Fundamentals of Computer
                        </div>
                        <div className="cp-item-label">
                            Operating System (Windows XP, 7, 8 & 10)
                        </div>
                    </div>



                </div>
                <div className='cp-submit-button-parent'>
                    <div className='cp-cancel-button' onClick={cancelButton}>
                        <p>Cancel</p>
                    </div>
                    <button class="button" onClick={navigateToSuccessAddCourse}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CoursePreview