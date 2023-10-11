import React from 'react'
import './EditCoursePreview.css';
import { useNavigate } from "react-router-dom"

function EditCoursePreview() {
    const navigate = useNavigate();

    const navigateToSuccessUpdateCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/update-course-status');
    };
    const cancelButton = () => {
        // 👇️ navigate to /contacts
        navigate('/add-course');
    };
    return (
        <div>
            <div >
                <div className='course-appbar-header'>
                    <h2>Edit Course Preview</h2>
                </div>
                <div className='ecp-parent'>
                    <div className="ecp-item-container">
                        <div className="ecp-item-heading">
                            Diploma in Computer Application (DCA)
                        </div>


                        <div className="ecp-item-label">
                            SEMESTER - I
                        </div>

                        <div className="ecp-item-label">
                            Fundamentals of Computer
                        </div>
                        <div className="ecp-item-label">
                            Operating System (Windows XP, 7, 8 & 10)
                        </div>
                    </div>



                </div>
                <div className='ecp-submit-button-parent'>
                    <div className='ecp-cancel-button' onClick={cancelButton}>
                        <p>Cancel</p>
                    </div>
                    <button class="button" onClick={navigateToSuccessUpdateCourse}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditCoursePreview