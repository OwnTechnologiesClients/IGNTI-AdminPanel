import React from 'react'
import { useState } from "react";
import './Type.css';
import { Link, NavLink, useNavigate } from "react-router-dom"



const Type = () => {
    const navigate = useNavigate();

    const navigateToCourse = () => {
        // 👇️ navigate to /contacts
        navigate('/course');
    };


    const navigateToSetExam = () => {
        // 👇️ navigate to /contacts
        navigate('/set-exam-detail');
    };
    return (
        <div>


            <div className='type-section'>
                <div className='appbar-header'>
                    <h2>Admin Panel</h2>
                </div>

                <div className='type-parent'>
                    <div className='type-child'>

                        <div className='type-parent'>
                            <div className='type-square'>
                                <p>Add Students</p>
                            </div>
                        </div>



                        <div className='type-parent' >

                            <div className='type-square' onClick={navigateToCourse}>
                                <p>Add Courses</p>
                            </div>
                        </div>

                        <div className='type-parent'>
                            <div className='type-square' onClick={navigateToSetExam}>
                                <p>Exam Set</p>
                            </div>
                        </div>

                        <div className='type-parent'>
                            <div className='type-square'>
                                <p>Result Set</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Type