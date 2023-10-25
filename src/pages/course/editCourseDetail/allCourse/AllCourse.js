import React from 'react'
import './AllCourse.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function AllCourse() {

    const navigate = useNavigate();

    const editCourse = () => {
        navigate('/edit-course');
    };



    return (
        <div>


            <div className='all-course-section'>
                <div className='course-appbar-header'>
                    <h2>All Course</h2>
                </div>


                <div className='all-course-parent'>
                    <div className='all-course-square' onClick={editCourse}>
                        <p>Diploma in Computer Application (DCA)</p>
                    </div>
                </div>

                <div className='all-course-parent'>
                    <div className='all-course-square' onClick={editCourse}>
                        <p>Advance Diploma in Computer Application (ADCA)-Old</p>
                    </div>
                </div>

                <div className='all-course-parent'>
                    <div className='all-course-square' onClick={editCourse}>
                        <p>X-Ray and ECG Technology</p>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default AllCourse