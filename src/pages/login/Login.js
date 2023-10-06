import React from 'react'
import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom"



const Login = () => {
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/select-course');
    };

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");



    return (
        <div>


            <div className='student-section'>
                <div className='appbar-header'>
                    <h2>Admin Panel</h2>
                </div>

                <div className='student-square'>
                    <div className='square-header'>
                        <h2>Login</h2>
                    </div>
                    <div className='student-card-parent'>
                        {/* <h2>BECOME A MEMBER</h2> */}
                        <div className='userid-section'>
                            <p>User ID</p>

                            {/* ------------ User Id Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={userId}
                                onChange={(e) => { setUserId(e.target.value) }}
                                placeholder="" />
                        </div>

                        <div className='userid-section'>
                            <p>Password</p>

                            {/* ------------ Password Input textfield -------------------- */}
                            <input type="text" className="form-control" name="title"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="" />
                        </div>


                        <div>
                            <div className='student-button-parent'>
                                <button class="button" onClick={navigateToContacts}>Login</button>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login