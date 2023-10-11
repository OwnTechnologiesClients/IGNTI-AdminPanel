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
      
    </Routes>
  );
}

export default App;
