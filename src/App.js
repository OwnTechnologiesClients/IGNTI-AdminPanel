import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Type from './pages/type/Type';
import Course from './pages/course/Course';
import AddCourse from './pages/course/addcourse/AddCourse';
import CoursePreview from './pages/course/addcourse/coursePreview/CoursePreview';
import CourseAddSuccess from './pages/course/addcourse/courseAddSuccess/CourseAddSuccess';
import AddSubject from './pages/course/addcourse/addSubject/AddSubject';
import AllCourse from './pages/course/editCourseDetail/allCourse/AllCourse';
import EditCourse from './pages/course/editCourseDetail/editCourse/EditCourse';
import EditCoursePreview from './pages/course/editCourseDetail/editCoursePreview/EditCoursePreview';
import CourseUpdateSuccess from './pages/course/editCourseDetail/courseUpdateSuccess/CourseUpdateSuccess';
import DeleteAllCourse from './pages/course/deleteCourse/deleteAllCourse/DeleteAllCourse';
import CourseDeleteSuccess from './pages/course/deleteCourse/courseDeleteSuccess/CourseDeleteSuccess';
import DeleteSubject from './pages/course/deleteCourse/deleteSubject/DeleteSubject';
import SetExamDetail from './pages/setExam/setExamDetail/SetExamDetail';
import SetQuestions from './pages/setExam/setExamDetail/setQuestions/SetQuestions';
import Publish from './pages/setExam/setExamDetail/publish/Publish';
import ExamPublishSuccess from './pages/setExam/setExamDetail/examPublishSuccess/ExamPublishSuccess';
import SelectResultDetail from './pages/setResult/selectResultDetail/SelectResultDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/adminlogin' element={<Login />} />
      <Route path='/type' element={<Type />} />
      <Route path='/course' element={<Course />} />
      <Route path='/add-course' element={<AddCourse />} />
      <Route path='/add-subject' element={<AddSubject />} />
      <Route path='/course-preview' element={<CoursePreview />} />
      <Route path='/course-add-successful' element={<CourseAddSuccess />} />
      <Route path='/all-course' element={<AllCourse />} />
      <Route path='/edit-course' element={<EditCourse />} />
      <Route path='/edit-course-preview' element={<EditCoursePreview />} />
      <Route path='/update-course-status' element={<CourseUpdateSuccess />} />

      <Route path='/delete-all-course' element={<DeleteAllCourse />} />
      <Route path='/delete-subject' element={<DeleteSubject />} />
      <Route path='/delete-course-status' element={<CourseDeleteSuccess />} />

      <Route path='/set-exam-detail' element={<SetExamDetail />} />
      <Route path='/set-questions' element={<SetQuestions />} />
      <Route path='/publish-questions' element={<Publish />} />
      <Route path='/exam-published' element={<ExamPublishSuccess />} />

      <Route path='/select-result' element={<SelectResultDetail />} />
      
      
    </Routes>
  );
}

export default App;
