import React from 'react'
import './CourseDeleteSuccess.css';
import { useNavigate } from "react-router-dom"

function CourseDeleteSuccess() {
    const navigate = useNavigate();

    const home = () => {
        // 👇️ navigate to /contacts
        navigate('/type');
    };
    const updateMoreCourse = () => {
        navigate('/delete-all-course');
    };
    return (
        <div>
            <div className='course-appbar-header'>
                <h2>Course Delete Status</h2>
            </div>
            <div className='cds-parent'>
                <div className="cds-item-container">

                    <img src="/img/success.png" alt="success" />

                    <div className="cds-item-heading">
                        Course Deleted successfully
                    </div>

                    <div className="cds-item-label">
                        Great News! Course Deleted Successfully
                    </div>


                </div>



            </div>
            <div className='cds-submit-button-parent'>
                <div className='cds-cancel-button' onClick={updateMoreCourse}>
                    <p>Delete More Course</p>
                </div>
                <button class="button" onClick={home}>Home</button>

            </div>
        </div>
    )
}

export default CourseDeleteSuccess