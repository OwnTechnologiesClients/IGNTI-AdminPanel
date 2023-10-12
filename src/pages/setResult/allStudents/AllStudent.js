import React from 'react'
import "./AllStudents.css"


const AllStudents = () => {
    return (
        <div>
            <div className='course-appbar-header'>
                <h2>All Students</h2>
            </div>

            <div className='ph-course-parent'>
                <img src="/img/teacher1.png" alt="success" />
                <div className='ph-course-detail'>
                    <h3>Name: Neha Mishra</h3>
                    <h3>EnrollNo : 12345</h3>

                </div>

            </div>


            <div className='ph-course-parent'>
                <img src="/img/teacher1.png" alt="success" />
                <div className='ph-course-detail'>
                    <h3>Name: Pooja Mishra</h3>
                    <h3>EnrollNo : 12345</h3>

                </div>

            </div>

            <div className='ph-course-parent'>
                <img src="/img/teacher1.png" alt="success" />
                <div className='ph-course-detail'>
                    <h3>Name: Shivani Mishra</h3>
                    <h3>EnrollNo : 12345</h3>

                </div>

            </div>


        </div>


    )
}

export default AllStudents