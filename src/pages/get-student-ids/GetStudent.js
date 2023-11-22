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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [arr, setArr] = useState([]);
  const [num, setNum] = useState("");
  const [searchEnrollNo, setSearchEnrollNo] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [filter, setFilter] = useState(false);
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  let [id, setId] = useState([]);
  if (!id) {
    id = [];
  }
  const [detail, setDetail] = useState([]);

  const filteredStudents = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      if (filter) {
        const filteredStudent = data.filter((student) => {
          return student.enrollNo && student.enrollNo.includes(searchEnrollNo);
        });
        setData(filteredStudent);
      } else {
        const filteredStudent = detail.filter((student) => {
          return student.enrollNo && student.enrollNo.includes(searchEnrollNo);
        });
        setFilter(true);
        setData(filteredStudent);
      }
    }, 600);
  };

  const filteredStudentsBySemester = async () => {
    try {
      if (num === "") {
        throw Error("Select Semester Number!");
      }
      if (num === "cancel") {
        getAllStudentIds();
        setNum("");
      } else {
        dispatch(SetLoading(true));
        const response = await axios({
          method: "post",
          url: "https://igti-backend.onrender.com/api/resultSets/get-result-set-set",
          data: {
            courseName: selectedCategory,
            semesterNumber: num,
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
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const filteredStudentsByName = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      if (filter) {
        const filteredStudent = data.filter((student) => {
          return (
            student.studentName && student.studentName.includes(searchName)
          );
        });
        setData(filteredStudent);
      } else {
        const filteredStudent = detail.filter((student) => {
          return (
            student.studentName && student.studentName.includes(searchName)
          );
        });
        setFilter(true);
        setData(filteredStudent);
      }
    }, 600);
  };

  const filteredStudentsByStatus = () => {
    if (selectStatus === "") {
      message.error("Please select category");
    } else {
      dispatch(SetLoading(true));
      setTimeout(() => {
        dispatch(SetLoading(false));
        if (filter) {
          const filteredStudent = data.filter((student) => {
            return student.authorized === (selectStatus === "authorized");
          });
          setData(filteredStudent);
        } else {
          const filteredStudent = detail.filter((student) => {
            return student.authorized === (selectStatus === "authorized");
          });
          setFilter(true);
          setData(filteredStudent);
        }
      }, 600);
    }
  };

  const handleSearchEnrollNoChange = (event) => {
    setSearchEnrollNo(event.target.value);
  };

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  function handleCategorySemester(event) {
    setNum(event.target.value);
  }

  function handleChangeStatus(event) {
    setSelectStatus(event.target.value);
  }

  const statusChange = async (enrollmentNo, index) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend.onrender.com/api/students/change-status",
        data: {
          enrollNo: enrollmentNo,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        const updatedDetail = [...detail];
        updatedDetail[index].authorized = !updatedDetail[index].authorized;
        setDetail(updatedDetail);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const getDetailsById = async (x) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend.onrender.com/api/students/get-student-id-detail",
        data: {
          id: x,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
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
        url: "https://igti-backend.onrender.com/api/students/get-student-all-course",
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
        url: "https://igti-backend.onrender.com/api/courses/name-Course-all",
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

  const getSemester = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "https://igti-backend.onrender.com/api/courses/get-course",
        data: {
          courseName: selectedCategory,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setArr(response.data.data.semesters);
        setNum(response.data.data.semesters[0].semesterNumber);
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
    getAllCoursesName();
  }, []);

  useEffect(() => {
    getAllStudentIds();
    getSemester();
  }, [selectedCategory]);

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

        <div className="category-div">
          <select
            name="category-list"
            onChange={handleCategorySemester}
            value={num}
          >
            <option value="" disabled>
              Select Semester Number
            </option>
            {arr.map((item, index) => {
              return <option value={`${index + 1}`}>{index + 1}</option>;
            })}
            <option value="cancel">Cancel</option>
          </select>
          <button onClick={filteredStudentsBySemester}>Click</button>
        </div>
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={handleNameChange}
            />
            <button onClick={filteredStudentsByName}>Click</button>
          </div>
          <div className="search-bar baba">
            <select
              name="category-list"
              onChange={handleChangeStatus}
              value={selectStatus}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="authorized">Authorized</option>
              <option value="restricted">Restricted</option>
            </select>
            <button className="hello" onClick={filteredStudentsByStatus}>
              Click
            </button>
          </div>
          <div className="all-button">
            <button
              onClick={() => {
                setFilter(false);
                setSearchEnrollNo("");
                setSearchName("");
                setSelectStatus("");
              }}
            >
              Show all students
            </button>
          </div>
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
                    src={`https://igti-backend.onrender.com/public/${value.imageFile}`}
                    alt="success"
                  />
                  <div className="ph-course-detail">
                    <h3>Name: {value.studentName}</h3>
                    <h3>EnrollNo : {value.enrollNo}</h3>
                    <div className="status-authorized">
                      <h3>
                        Status :{" "}
                        {value.authorized ? "Authorized" : "Restricted"}
                      </h3>
                      <button
                        onClick={() =>
                          statusChange(value.enrollNo, index)
                        }
                      >
                        Change
                      </button>
                    </div>
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
                    <div className="ph-course-parent">
                      <p className="set-index">{index + 1}.</p>
                      <img
                        src={`https://igti-backend.onrender.com/public/${detail[index].imageFile}`}
                        alt="success"
                      />
                      <div className="ph-course-detail">
                        <h3>Name: {detail[index].studentName}</h3>
                        <h3>EnrollNo : {detail[index].enrollNo}</h3>
                        <div className="status-authorized">
                          <h3>
                            Status :{" "}
                            {detail[index].authorized
                              ? "Authorized"
                              : "Restricted"}
                          </h3>
                          <button
                            onClick={() =>
                              statusChange(detail[index].enrollNo, index)
                            }
                          >
                            Change
                          </button>
                        </div>
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
