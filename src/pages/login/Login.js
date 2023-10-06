import React from 'react'
import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom"



const Login = () => {
    const navigate = useNavigate();

    const navigateToType = () => {
        // 👇️ navigate to /contacts
        navigate('/type');
    };

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");



    return (
        <div>


            <div className='login-section'>
                <div className='login-appbar-header'>
                    <h2>Admin Panel</h2>
                </div>

                <div className='login-square'>
                    <div className='login-header'>
                        <h2>Login</h2>
                    </div>
                    <div className='login-card-parent'>
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
                            <div className='login-button-parent'>
                                <button class="button" onClick={navigateToType}>Login</button>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login