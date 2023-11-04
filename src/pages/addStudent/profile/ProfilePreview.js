import React, { useEffect, useState } from "react";
import "./ProfilePreview.css";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { SetLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProfilePreview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  let [user, setUser] = useState();
  if (!user) {
    user = {
      courseName: "",
      studentName: "",
      fatherName: "",
      dateOfBirth: "",
      city: "",
      state: "",
      pincode: "",
    };
  }

  const submit = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/student-added");
    }, 600);
  };

  const cancel = () => {
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(SetLoading(false));
      navigate("/type");
    }, 600);
  };

  const getDetails = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/api/students/get-student-id-detail",
        data: {
          id: id,
        },
      });
      dispatch(SetLoading(false));
      if (response.data.success) {
        message.success(response.data.message);
        setUser(response.data.data);
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
    getDetails();
  }, []);

  return (
    <div>
      <div className="preview-section">
        <div className="preview-square">
          <div className="preview-square-header">
            <h2>Student Profile Preview</h2>
          </div>
          <div className="preview-card-parent">
            {/* <h2>BECOME A MEMBER</h2> */}
            <div className="border-1"></div>
            <div className="preview-user-information-section">
              <p>{user.courseName}</p>
            </div>

            <div className="preview-student-information-section">
              <div className="preview-section-one">
                <div className="preview-student-info">
                  <p1>Name: </p1>
                  <p2>{user.studentName}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Father Name: </p1>
                  <p2>{user.fatherName}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Date Of Birth: </p1>
                  <p2>{user.dateOfBirth}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>City:</p1>
                  <p2>{user.city}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>State:</p1>
                  <p2>{user.state}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Pincode:</p1>
                  <p2>{user.pincode}</p2>
                </div>

                <div className="preview-student-info">
                  <p1>Enrollment No:</p1>
                  <p2>{user.enrollNo}</p2>
                </div>

              </div>

              <div className="preview-section-two">
                <img
                  src={`http://localhost:9000/public/${user.imageFile}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="preview-submit-button-parent">
        <div className="preview-cancel-button" onClick={cancel}>
          <p>Cancel</p>
        </div>
        <button class="button" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
