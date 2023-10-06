import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Type from './pages/type/Type';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/adminlogin' element={<Login />} />
      <Route path='/type' element={<Type />} />
    </Routes>
  );
}

export default App;
