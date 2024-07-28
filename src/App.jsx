import { useState } from 'react'
import Login from './pages/Login'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import HomePage from './pages/Home'; // Create this component for the home page


function App() {
  const [count, setCount] = useState(0)

  return  (
    <Router>
        <div>
            <nav>
                <Link to="/login">Login</Link> | 
                <Link to="/register">Register</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm/>} />
            </Routes>
        </div>
    </Router>
);

}

export default App
