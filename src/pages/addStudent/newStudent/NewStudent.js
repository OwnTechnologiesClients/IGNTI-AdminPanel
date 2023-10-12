import React from 'react'

import './NewStudent.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"



function NewStudent() {
    const [firstname, setFirstname] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [dob, setDob] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const addStudentButton = () => {
        navigate('/profile-preview');
    };

    const [selectedCategory, setSelectedCategory] = useState();
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    return (
        <div className='new-student-detail-parent'>




            <div className='new-student-query-square'>
                <div className='new-student-square-header'>
                    <h2>Student Details</h2>
                </div>
                <div className='new-student-query-card-parent'>

                    {/* ------------ First name Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={firstname}
                        onChange={(e) => { setFirstname(e.target.value) }}
                        placeholder="First Name" />


                    {/* ------------ emailAddress Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={emailAddress}
                        onChange={(e) => { setEmailAddress(e.target.value) }}
                        placeholder="Email Address" />

                    {/* ------------ father Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={fatherName}
                        onChange={(e) => { setFatherName(e.target.value) }}
                        placeholder="Father Name" />

                    {/* ------------ DOB textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={dob}
                        onChange={(e) => { setDob(e.target.value) }}
                        placeholder="Date Of Birth" />

                    {/* ------------ contact Number Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={contactNumber}
                        onChange={(e) => { setContactNumber(e.target.value) }}
                        placeholder="Contact Number" />

                    {/* ------------ City Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }}
                        placeholder="Enter City" />

                    {/* ------------ State Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={state}
                        onChange={(e) => { setState(e.target.value) }}
                        placeholder="State" />

                    {/* ------------ Pincode Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={pincode}
                        onChange={(e) => { setPincode(e.target.value) }}
                        placeholder="Enter Pincode" />

                    {/* ------------ Address Input textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        placeholder="Enter Full Address" />

                    {/* ------------ Select Course textfield -------------------- */}
                    <input type="text" className="form-control" name="title"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        placeholder="Upload Image" />

                    {/* ------------ Upload Image textfield -------------------- */}


                    <div className="add-course-dropdown">

                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}>
                            <option value="">Select Course</option>
                            <option value="1">Diploma in Computer Application (DCA)</option>
                            <option value="2">Advance Diploma in Computer Application (ADCA)-Old</option>
                            <option value="3">X-Ray and ECG Technology</option>
                            <option value="4">Certificate in Desktop Publication (CDTP)</option>
                            
                        </select>
                    </div>


                    <div className='new-student-signup-button'>
                        <button class="button" onClick={addStudentButton}>Add Student</button>


                    </div>






                </div>
            </div>


        </div>
    )
}

export default NewStudent