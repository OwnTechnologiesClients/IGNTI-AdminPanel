import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Type from './pages/type/Type';
import Course from './pages/course/Course';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/adminlogin' element={<Login />} />
      <Route path='/type' element={<Type />} />
      <Route path='/course' element={<Course />} />
      <Route path='/add-course' element={<Course />} />
    </Routes>
  );
}

export default App;
