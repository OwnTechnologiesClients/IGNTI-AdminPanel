import React from 'react'
import { useState } from "react";
import './Type.css';
import { useNavigate } from "react-router-dom"



const Type = () => {
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/select-course');
    };

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");



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


                        <div className='type-parent'>
                            <div className='type-square'>
                                <p>Add Courses</p>
                            </div>
                        </div>


                        <div className='type-parent'>
                            <div className='type-square'>
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