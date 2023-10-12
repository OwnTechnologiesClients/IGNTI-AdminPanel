import React from 'react'
import './DeleteSubject.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function DeleteSubject() {


    const [selectedCategory, setSelectedCategory] = useState();

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/delete-all-course');
    };
    const proceed = () => {
        navigate('/delete-course-status');
    };

    const deleteSubject = () => {
        navigate('/delete-subject');
    };


    const [courseName, setCourseName] = useState("");
    const [duration, setDuration] = useState("");
    const [fee, setFees] = useState("");

    return (
        <div>


            <div>
                <div className='course-appbar-header'>
                    <h2>Delete Subject</h2>
                </div>



                <div className='delete-subject-parent'>
                    <div className='delete-subject-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='delete-subject-course-name-section'>
                            <p>Course Name</p>

                            {/* ------------ Course name textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={courseName}
                                onChange={(e) => { setCourseName(e.target.value) }}
                                placeholder="" />


                        </div>

                        {/* -------------- No of semester ----------------- */}
                        <div className='delete-subject-course-name-section'>
                            <p>No Of Semesters</p>

                            <div className="delete-subject-semester-dropdown">

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



                    </div>





                </div>


                <div className='delete-subject-list-section'>
                    <div className='delete-subject-square'>
                        <p>Fundamentals of Computer</p>

                    </div>
                    <img src="/img/delete.png" alt="success" onClick={deleteSubject} />

                </div>

                <div className='delete-subject-list-section'>
                    <div className='delete-subject-square'>
                        <p>Operating System (Windows XP, 7, 8 & 10)</p>

                    </div>
                    <img src="/img/delete.png" alt="success" onClick={deleteSubject} />

                </div>

                <div className='delete-subject-list-section'>
                    <div className='delete-subject-square'>
                        <p>Microsoft Office (MS-Word, MS-PowerPoint, MS-Excel & MS-Access)</p>

                    </div>
                    <img src="/img/delete.png" alt="success" onClick={deleteSubject} />

                </div>





            </div>
            <div className='delete-subject-primary-button-parent'>
                <div className='delete-subject-secondary-button' onClick={cancel}>
                    <p>Cancel</p>
                </div>
                <button class="button" onClick={proceed}>Proceed</button>

            </div>

        </div>
    )
}

export default DeleteSubject