import React, { useEffect, useState } from "react";
import "./GetStudent.css";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import axios from "axios";

const GetStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { courseName, semesterNumber, subjectName } = useParams();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchEnrollNo, setSearchEnrollNo] = useState("");
  const [filter, setFilter] = useState(false);
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  let [id, setId] = useState([]);
  if (!id) {
    id = [];
  }
  const [detail, setDetail] = useState([]);

  const navigateToStudentResult = (id) => {
    // navigate(`/student-result/${id}/${semesterNumber}/${courseName}`);
  };

  //  detail.filter((student) => {
  //   console.log(student);
  //   // return student.enrollNo && student.enrollNo.includes(searchEnrollNo);
  // });

  const filteredStudents = () => {
    const filteredStudent = detail.filter((student) => {
      // console.log(student);
      return student.enrollNo && student.enrollNo.includes(searchEnrollNo);
    });
    setFilter(true);
    setData(filteredStudent);
    // console.log(filteredStudent)
  };

  const handleSearchEnrollNoChange = (event) => {
    setSearchEnrollNo(event.target.value);
  };

  const getDetailsById = async (x) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/get-student-id-detail",
        data: {
          id: x,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        // message.success(response.data.message);
        setDetail((prevDetail) => [...prevDetail, response.data.data]);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getAllStudentIds = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/get-student-all-course",
        data: {
          courseName: selectedCategory,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setDetail([]);
        response.data.data.map((xx) => {
          getDetailsById(xx);
        });
        setId(response.data.data);
      } else {
        setId([]);
        throw Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      if (selectedCategory !== "") {
        message.error(error.message);
      }
    }
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const getAllCoursesName = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/courses/name-Course-all",
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setCourses(response.data.data);
        setSelectedCategory(response.data.data[0]);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
    //   getAllStudentIds();
    getAllCoursesName();
  }, []);

  useEffect(() => {
    getAllStudentIds();
  }, [selectedCategory]);

  // console.log(data);

  return (
    <div className="set-width">
      <div className="course-appbar-header">
        <h2>All Students</h2>
      </div>

      <div className="course-list">
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {courses.map((course) => {
            return <option value={`${course}`}>{course}</option>;
          })}
        </select>
      </div>

      {id.length !== 0 && (
        <div className="aaa">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Enroll No"
              value={searchEnrollNo}
              onChange={handleSearchEnrollNoChange}
            />
            <button onClick={filteredStudents}>Click</button>
          </div>
          <button
            onClick={() => {
              setFilter(false);
              setSearchEnrollNo("");
            }}
          >
            Show all students
          </button>
        </div>
      )}

      <div className="grid-container">
        {id.length === 0 && (
          <div className="text-set">
            <p>
              No Student Registered with this course or matching the search
              criteria
            </p>
          </div>
        )}

        {filter && data.length === 0 && (
          <div className="text-set">
            <p>No Student Found</p>
          </div>
        )}

        {filter &&
          data.map((value, index) => {
            return (
              <div className="grid-item" key={index}>
                <div className="ph-course-parent">
                  <p className="set-index">{index + 1}.</p>
                  <img
                    src={`http://localhost:9000/public/${value.imageFile}`}
                    alt="success"
                  />
                  <div className="ph-course-detail">
                    <h3>Name: {value.studentName}</h3>
                    <h3>EnrollNo : {value.enrollNo}</h3>
                  </div>
                </div>
              </div>
            );
          })}

        {!filter &&
          id.map((value, index) => {
            return (
              <div className="grid-item" key={index}>
                <div>
                  {detail[index] && (
                    <div
                      className="ph-course-parent"
                      onClick={() => navigateToStudentResult(detail[index]._id)}
                    >
                      <p className="set-index">{index + 1}.</p>
                      <img
                        src={`http://localhost:9000/public/${detail[index].imageFile}`}
                        alt="success"
                      />
                      <div className="ph-course-detail">
                        <h3>Name: {detail[index].studentName}</h3>
                        <h3>EnrollNo : {detail[index].enrollNo}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GetStudent;
