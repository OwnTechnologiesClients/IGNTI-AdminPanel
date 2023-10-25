import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import './Login.css';
import { useNavigate } from "react-router-dom"



const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const navigateToType = async () => {
        // 👇️ navigate to /contacts
        console.log(userId);
        console.log(password);
        const response = await
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/api/admins/login',
                    data: {
                        userName: userId,
                        password: password
                    }
                });
                console.log(response)
        if(response.data.success) {
            localStorage.setItem("adminToken", response.data.data);
            // console.log(localStorage.getItem("adminToken"))
            navigate('/type');
        }        
    };
    useEffect(() => {
        if(localStorage.getItem("adminToken")) {
            navigate("/type")
        }
    }, [])



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
                            <p>UserName</p>

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