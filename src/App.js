
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Type from "./pages/type/Type";
import Course from "./pages/course/Course";
import AddCourse from "./pages/course/addcourse/AddCourse";
import CoursePreview from "./pages/course/addcourse/coursePreview/CoursePreview";
import CourseAddSuccess from "./pages/course/addcourse/courseAddSuccess/CourseAddSuccess";
import AddSubject from "./pages/course/addcourse/addSubject/AddSubject";
import AllCourse from "./pages/course/editCourseDetail/allCourse/AllCourse";
import EditCourse from "./pages/course/editCourseDetail/editCourse/EditCourse";
import EditCoursePreview from "./pages/course/editCourseDetail/editCoursePreview/EditCoursePreview";
import CourseUpdateSuccess from "./pages/course/editCourseDetail/courseUpdateSuccess/CourseUpdateSuccess";
import DeleteAllCourse from "./pages/course/deleteCourse/deleteAllCourse/DeleteAllCourse";
import CourseDeleteSuccess from "./pages/course/deleteCourse/courseDeleteSuccess/CourseDeleteSuccess";
import DeleteSubject from "./pages/course/deleteCourse/deleteSubject/DeleteSubject";
import SetExamDetail from "./pages/setExam/setExamDetail/SetExamDetail";
import SetQuestions from "./pages/setExam/setExamDetail/setQuestions/SetQuestions";
import Publish from "./pages/setExam/setExamDetail/publish/Publish";
import ExamPublishSuccess from "./pages/setExam/setExamDetail/examPublishSuccess/ExamPublishSuccess";
import SelectResultDetail from "./pages/setResult/selectResultDetail/SelectResultDetail";
import AllStudents from "./pages/setResult/allStudents/AllStudent";
import StudentResult from "./pages/setResult/studentResult/StudentResult";
import NewStudent from "./pages/addStudent/newStudent/NewStudent";
import ProfilePreview from "./pages/addStudent/profile/ProfilePreview";
import StudentAddSuccess from "./pages/addStudent/studentAddSuccess/StudentAddSuccess";
import ProtectedPage from "./load/ProtectedPage";
import Spinner from "./load/Spinner";
import { useSelector } from "react-redux";
import GetStudent from "./pages/get-student-ids/GetStudent";
import Studentform from "./pages/studentform/Studentform";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/studentform" element={<Studentform />} />
        {/* <Route path="/adminlogin" element={<Login />} /> */}
        <Route path="/type" element={<ProtectedPage><Type /></ProtectedPage>} />
        <Route path="/course" element={<ProtectedPage><Course /></ProtectedPage>} />
        <Route path="/add-course" element={<ProtectedPage><AddCourse /></ProtectedPage>} />
        <Route path="/add-subject/:id" element={<ProtectedPage><AddSubject /></ProtectedPage>} />
        <Route path="/course-preview/:id" element={<ProtectedPage><CoursePreview /></ProtectedPage>} />
        <Route path="/course-add-successful" element={<ProtectedPage><CourseAddSuccess /></ProtectedPage>} />
        <Route path="/all-course" element={<ProtectedPage><AllCourse /></ProtectedPage>} />
        <Route path="/edit-course/:id" element={<ProtectedPage><EditCourse /></ProtectedPage>} />
        <Route path="/edit-course-preview/:id" element={<ProtectedPage><EditCoursePreview /></ProtectedPage>} />
        <Route path="/update-course-status" element={<ProtectedPage><CourseUpdateSuccess /></ProtectedPage>} />

        <Route path="/delete-all-course" element={<ProtectedPage><DeleteAllCourse /></ProtectedPage>} />
        <Route path="/delete-subject/:id" element={<ProtectedPage><DeleteSubject /></ProtectedPage>} />
        <Route path="/delete-course-status" element={<ProtectedPage><CourseDeleteSuccess /></ProtectedPage>} />

        <Route path="/set-exam-detail" element={<ProtectedPage><SetExamDetail /></ProtectedPage>} />
        <Route path="/set-questions/:courseName/:semesterNumber/:subjectName" element={<ProtectedPage><SetQuestions /></ProtectedPage>} />
        <Route path="/publish-questions" element={<ProtectedPage><Publish /></ProtectedPage>} />
        <Route path="/exam-published" element={<ProtectedPage><ExamPublishSuccess /></ProtectedPage>} />

        <Route path="/select-result" element={<ProtectedPage><SelectResultDetail /></ProtectedPage>} />
        <Route path="/all-students/:courseName/:semesterNumber/:subjectName" element={<ProtectedPage><AllStudents /></ProtectedPage>} />
        <Route path="/student-result/:id/:semesterNumber/:courseName" element={<ProtectedPage><StudentResult /></ProtectedPage>} />

        <Route path="/new-student" element={<ProtectedPage><NewStudent /></ProtectedPage>} />
        <Route path="/profile-preview/:id" element={<ProtectedPage><ProfilePreview /></ProtectedPage>} />
        <Route path="/student-added" element={<ProtectedPage><StudentAddSuccess /></ProtectedPage>} />

        <Route path="/student-course" element={<ProtectedPage><GetStudent /></ProtectedPage>} />
      </Routes>
    </div>
  );
}

export default App;
