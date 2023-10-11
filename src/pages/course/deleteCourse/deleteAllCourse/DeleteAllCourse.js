import React from 'react'
import './DeleteAllCourse.css';
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";



function DeleteAllCourse() {

    const navigate = useNavigate();

    const editCourse = () => {
        navigate('/edit-course');
    };



    return (
        <div>


            <div className='delete-course-section'>
                <div className='course-appbar-header'>
                    <h2>Delete Course</h2>
                </div>


                <div className='delete-course-parent'>
                    <div className='delete-course-square' onClick={editCourse}>
                        <p>Diploma in Computer Application (DCA)</p>

                    </div>
                    <img src="/img/delete.png" alt="success" />

                </div>

                <div className='delete-course-parent'>
                    <div className='delete-course-square' onClick={editCourse}>
                        <p>Advance Diploma in Computer Application (ADCA)-Old</p>
                    </div>
                    <img src="/img/delete.png" alt="success" />
                </div>

                <div className='delete-course-parent'>
                    <div className='delete-course-square' onClick={editCourse}>
                        <p>X-Ray and ECG Technology</p>
                    </div>
                    <img src="/img/delete.png" alt="success" />
                </div>


            </div>


        </div>
    )
}

export default DeleteAllCourse