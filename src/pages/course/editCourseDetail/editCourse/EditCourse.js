import React from 'react'
import './EditCourse.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function EditCourse() {


    const [selectedCategory, setSelectedCategory] = useState();

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/all-course');
    };
    const updateCourseDetail = () => {
        navigate('/all-course');
    };

    const [courseName, setCourseName] = useState("");
    const [duration, setDuration] = useState("");
    const [fee, setFees] = useState("");

    return (
        <div>


            <div className='edit-course-section'>
                <div className='course-appbar-header'>
                    <h2>Edit Course</h2>
                </div>



                <div className='edit-course-parent'>
                    <div className='edit-course-duration-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='edit-userid-section'>
                            <p>Course Name</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={courseName}
                                onChange={(e) => { setCourseName(e.target.value) }}
                                placeholder="" />
                        </div>


                        {/* -------------- Duration ----------------- */}

                        <div className='edit-userid-section'>
                            <p>Duration</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={duration}
                                onChange={(e) => { setDuration(e.target.value) }}
                                placeholder="" />
                        </div>

                    </div>



                    <div className='edit-semester-fee-section'>

                        {/* -------------- No of semester ----------------- */}
                        <div className='edit-userid-section'>
                            <p>No Of Semesters</p>

                            <div className="edit-semester-dropdown">

                                <select
                                    name="category-list"
                                    id="category-list"
                                    onChange={handleCategoryChange}>
                                    <option value="">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>


                        {/* -------------- Fees ----------------- */}

                        <div className='edit-userid-section'>
                            <p>Fees</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={fee}
                                onChange={(e) => { setFees(e.target.value) }}
                                placeholder="" />
                        </div>



                    </div>




                </div>


            </div>
            <div className='edit-submit-button-parent'>
                <div className='cas-cancel-button' onClick={cancel}>
                    <p>Cancel</p>
                </div>
                <button class="button" onClick={updateCourseDetail}>Update Course Detail  & Continue</button>

            </div>

        </div>
    )
}

export default EditCourse