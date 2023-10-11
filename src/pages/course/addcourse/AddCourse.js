import React from 'react'
import './AddCourse.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function AddCourse() {

    const navigateToAddCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/select-course');
    };


    const [sportList, setSportList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState();

    function getFilteredList() {
        if (!selectedCategory) {
            return sportList;
        }
        return sportList.filter((item) => item.category === selectedCategory);
    }

    // Avoid duplicate function calls with useMemo
    var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    const navigate = useNavigate();

    const navigateToContacts = () => {
        navigate('/test-subjects');
    };

    const [courseName, setCourseName] = useState("");
    const [duration, setDuration] = useState("");
    const [fee, setFees] = useState("");

    return (
        <div>


            <div className='course-section'>
                <div className='course-appbar-header'>
                    <h2>Add Course</h2>
                </div>



                <div className='add-course-parent'>
                    <div className='course-duration-section'>

                        {/* -------------- Course Name ----------------- */}
                        <div className='ac-userid-section'>
                            <p>Course Name</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={courseName}
                                onChange={(e) => { setCourseName(e.target.value) }}
                                placeholder="" />
                        </div>


                        {/* -------------- Duration ----------------- */}

                        <div className='ac-userid-section'>
                            <p>Duration</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={duration}
                                onChange={(e) => { setDuration(e.target.value) }}
                                placeholder="" />
                        </div>

                    </div>



                    <div className='semester-fee-section'>

                        {/* -------------- No of semester ----------------- */}
                        <div className='ac-userid-section'>
                            <p>No Of Semesters</p>

                            <div className="semester-dropdown">

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

                        <div className='ac-userid-section'>
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
            <div>
                <div className='save-course-detail-button-parent'>
                    <button class="button" onClick={navigateToAddCourse}>Save Course Detail  & Continue</button>

                </div>
            </div>

        </div>
    )
}

export default AddCourse