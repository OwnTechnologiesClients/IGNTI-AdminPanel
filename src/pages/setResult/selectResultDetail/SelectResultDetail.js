import React from 'react'
import './SelectResultDetail.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function SelectResultDetail() {


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


            <div className='set-result-section'>
                <div className='course-appbar-header'>
                    <h2>Select Result</h2>
                </div>



                <div className='set-result-parent'>
                    <div className='set-result-duration-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='set-result-userid-section'>
                            <p>Course Name</p>

                            {/* ------------ dropdown -------------------- */}
                            <div className="set-result-dropdown-section">

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

                        <div className='set-result-userid-section'>
                            <p>Subject</p>

                            {/* ------------ dropdown -------------------- */}
                            <div className="set-result-dropdown-section">

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



                    <div className='set-result-semester-fee-section'>

                        {/* -------------- No of semester ----------------- */}
                        <div className='set-result-userid-section'>
                            <p>No Of Semesters</p>

                            <div className="set-result-dropdown-section">

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
            <div className='set-result-primary-button-parent'>
                <div className='set-result-secondary-button' onClick={cancel}>
                    <p>Cancel</p>
                </div>
                <button class="button" onClick={setQuestions}>Proceed To Set Questions</button>

            </div>

        </div>
    )
}

export default SelectResultDetail