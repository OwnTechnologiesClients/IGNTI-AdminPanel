import React from 'react'
import './AddSubject.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";
import axios from 'axios';



function AddSubject() {
    const [selectedCategory, setSelectedCategory] = useState();
    const [courseName, setCourseName] = useState("");
    const [duration, setDuration] = useState("");

    const navigateToCoursePreview = async () => {
        // console.log(selectedCategory);
        // console.log(courseName);
        // console.log(duration)
        const response = await
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/api/subjects/add-subject',
                    data: {
                        courseName: courseName,
                        semesterNumber: selectedCategory,
                        newSubjects: [
                            {
                                subjectName: duration
                            }
                        ]
                    }
                });
                console.log(response)
        // 👇️ navigate to /contacts
        navigate('/course-preview');
    };




    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const navigate = useNavigate();

    const navigateToContacts = () => {
        navigate('/test-subjects');
    };

    
    const [fee, setFees] = useState("");

    return (
        <div>


            <div className='subject-section'>
                <div className='course-appbar-header'>
                    <h2>Add Subject</h2>
                </div>



                <div className='add-subject-parent'>
                    <div className='subject-duration-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='as-userid-section'>
                            <p>Course Name</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={courseName}
                                onChange={(e) => { setCourseName(e.target.value) }}
                                placeholder="" />
                        </div>


                        {/* -------------- Subject ----------------- */}

                        <div className='as-userid-section'>
                            <p>Subject</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={duration}
                                onChange={(e) => { setDuration(e.target.value) }}
                                placeholder="" />
                        </div>

                    </div>



                    <div className='semester-fee-section'>

                        {/* -------------- semester ----------------- */}
                        <div className='as-userid-section'>
                            <p>No Of Semesters</p>

                            <div className="as-semester-dropdown">

                                <select
                                    name="category-list"
                                    id="category-list"
                                    onChange={handleCategoryChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>

                        <div className='add-subject-button-parent'>
                    
                            <button class="button" onClick={navigateToCoursePreview}>Add Subject</button>

                        </div>



                    </div>




                </div>


            </div>
            <div>
                <div className='cs-submit-button-parent'>
                    <div className='cs-secondary-button'>
                        <p>Save Subject Details</p>
                    </div>
                    <button class="button" onClick={navigateToCoursePreview}>Proceed</button>

                </div>
            </div>

        </div>
    )
}

export default AddSubject