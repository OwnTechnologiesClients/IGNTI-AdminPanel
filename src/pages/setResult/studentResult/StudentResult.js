import React from 'react'

import { useState } from "react";
import './StudentResult.css';
import { NavLink, Link, useNavigate } from "react-router-dom"



const StudentResult = () => {
    const navigate = useNavigate();

    const publishButton = () => {
        // 👇️ navigate to /contacts
        navigate('/all-students');
    };

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");



    return (
        <div>



            <div className='result-section'>

                <div className='result-square'>
                    <div className='square-header'>
                        <h2>STUDENT DETAILS</h2>
                    </div>
                    <div className='result-card-parent'>
                        {/* <h2>BECOME A MEMBER</h2> */}
                        <div className='border-1'></div>
                        <div className='result-user-information-section'>
                            <p>Diploma in Computer Application (DCA)</p>
                        </div>


                        <div className='student-information-section'>

                            <div className='section-one'>
                                <div className='student-info'>
                                    <p1>Name: </p1>
                                    <p2>Gaurav Sharma</p2>
                                </div>

                                <div className='student-info'>
                                    <p1>Father Name: </p1>
                                    <p2>VISHWAJEET SHARMA</p2>
                                </div>


                                <div className='student-info'>
                                    <p1>Date Of Birth: </p1>
                                    <p2>12-05-2014</p2>
                                </div>

                                <div className='student-info'>
                                    <p1>Enroll No:</p1>
                                    <p2>01-08-2014-005</p2>
                                </div>

                            </div>

                            <div className='section-two'>
                                <img src="/img/teacher1.png" />
                            </div>


                        </div>



                    </div>
                    <div className='square-dashboard'>



                        <h2>DASHBOARD</h2>

                        <div className='course-table'>
                            <div className="dashboard">

                                <div className="parent-row">
                                    <span>S.No</span>
                                    <span>Exam Name</span>
                                    <span>Maximum Marks</span>
                                    <span>Obtained Marks</span>
                                    <span>Grade</span>
                                </div>
                                <div className="child-row">
                                    <span>1</span>
                                    <span>COMPUTER FUNDAMENTALS	</span>
                                    <span>200</span>

                                    <input type="text" className="form-control" name="title"
                                        value={userId}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                        placeholder="50" />

                                    <span>A</span>
                                </div>




                                <div className="child-row">
                                    <span>1</span>
                                    <span>COMPUTER FUNDAMENTALS	</span>
                                    <span>200</span>

                                    <input type="text" className="form-control" name="title"
                                        value={userId}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                        placeholder="60" />

                                    <span>A</span>
                                </div>


                                <div className="child-row">
                                    <span>1</span>
                                    <span>COMPUTER FUNDAMENTALS	</span>
                                    <span>200</span>

                                    <input type="text" className="form-control" name="title"
                                        value={userId}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                        placeholder="79" />

                                    <span>A</span>
                                </div>



                                <div className="child-row">
                                    <span>1</span>
                                    <span>COMPUTER FUNDAMENTALS	</span>
                                    <span>200</span>

                                    <input type="text" className="form-control" name="title"
                                        value={userId}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                        placeholder="79" />

                                    <span>A</span>
                                </div>


                                <div className="child-row">
                                    <span>1</span>
                                    <span>COMPUTER FUNDAMENTALS	</span>
                                    <span>200</span>

                                    <input type="text" className="form-control" name="title"
                                        value={userId}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                        placeholder="79" />

                                    <span>A</span>
                                </div>


                                

                            </div>
                        </div>









                    </div>





                </div>

                <div className='percentage-square-dashboard'>
                    <p1>Percentage : 78</p1>

                    <p1>Grade : A</p1>

                    <p1>Result : Pass</p1>
                </div>
            </div>

            <div className='publish-section' onClick={publishButton}>

                <div className='publish-button'>
                    <p>PUBLISH</p>
                </div>

            </div>

           
        </div>
    )
}

export default StudentResult