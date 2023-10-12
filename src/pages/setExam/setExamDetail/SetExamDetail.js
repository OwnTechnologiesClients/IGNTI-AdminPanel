import React from 'react'
import './SetExamDetail.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function SetExamDetail() {


    const [selectedCategory, setSelectedCategory] = useState();

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/type');
    };
    const setQuestions = () => {
        navigate('/set-questions');
    };


    return (
        <div>


            <div className='set-exam-section'>
                <div className='course-appbar-header'>
                    <h2>Set Exam</h2>
                </div>



                <div className='set-exam-parent'>
                    <div className='set-exam-duration-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='set-exam-userid-section'>
                            <p>Course Name</p>

                            {/* ------------ dropdown -------------------- */}
                            <div className="set-exam-dropdown-section">

                                <select
                                    name="category-list"
                                    id="category-list"
                                    onChange={handleCategoryChange}>
                                    <option value="">Diploma in Computer Application (DCA)</option>
                                    <option value="2">Diploma in Computer Application (DCA)</option>
                                    <option value="3">Certificate in Desktop Publication (CDTP)</option>

                                </select>
                            </div>
                        </div>


                        {/* -------------- Subject ----------------- */}

                        <div className='set-exam-userid-section'>
                            <p>Subject</p>

                            {/* ------------ dropdown -------------------- */}
                            <div className="set-exam-dropdown-section">

                                <select
                                    name="category-list"
                                    id="category-list"
                                    onChange={handleCategoryChange}>
                                    <option value="">Fundamentals of Computer</option>
                                    <option value="2">Operating System (Windows XP, 7, 8 & 10)</option>
                                    <option value="3">Microsoft Office (MS-Word, MS-PowerPoint, MS-Excel & MS-Access)</option>

                                </select>
                            </div>
                        </div>

                    </div>



                    <div className='set-exam-semester-fee-section'>

                        {/* -------------- No of semester ----------------- */}
                        <div className='set-exam-userid-section'>
                            <p>No Of Semesters</p>

                            <div className="set-exam-dropdown-section">

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


            </div>
            <div className='set-exam-primary-button-parent'>
                <div className='set-exam-secondary-button' onClick={cancel}>
                    <p>Cancel</p>
                </div>
                <button class="button" onClick={setQuestions}>Proceed To Set Questions</button>

            </div>

        </div>
    )
}

export default SetExamDetail