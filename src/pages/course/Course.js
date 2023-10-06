import React from 'react'
import { useState } from "react";
import './Course.css';
import { useNavigate } from "react-router-dom"



const Course = () => {
    const navigate = useNavigate();

    const navigateToAddCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/select-course');
    };


    return (
        <div>


            <div className='course-section'>
                <div className='course-appbar-header'>
                    <h2>Admin Panel</h2>
                </div>

                <div className='course-parent'>
                    <div className='course-child'>

                        <div className='course-parent'>
                            <div className='course-square' onClick={navigateToAddCourse}>
                                <p>Add New Course</p>
                            </div>
                        </div>


                        <div className='course-parent'>
                            <div className='course-square'>
                                <p>Edit Course</p>
                            </div>
                        </div>


                        <div className='course-parent'>
                            <div className='course-square'>
                                <p>Delete Course</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Course