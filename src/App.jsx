// App.jsx
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails'; // Import the new component
import UpdateMovie from './pages/UpdateMovie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} /> {/* New route for movie details */}
        <Route path="/movie/update/:movieId" element={<UpdateMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
