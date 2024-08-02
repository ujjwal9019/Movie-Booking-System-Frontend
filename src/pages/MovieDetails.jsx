import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { FooterThree } from '../components/Footer';

const MovieDetails = () => {
  const { movieId } = useParams(); // Get the movieId from the route parameters
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token not found');
          navigate('/login'); // Redirect to login page if no token
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/v1/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        if (error.response.status === 403) {
          alert('You do not have permission to view this resource.');
          navigate('/'); // Redirect if forbidden
        }
      }
    };

    fetchMovieDetails();
  }, [movieId, navigate]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token not found');
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:8080/api/v1/movie/delete/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/'); // Redirect to the home page or another relevant page after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
      if (error.response.status === 403) {
        alert('You do not have permission to delete this movie.');
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/movie/update/${movieId}`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <Navbar />
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-[27rem] object-none"
        />
      )}
      <div className="pr-[1.5rem] pl-[22rem] mt-[30px] space-y-4">
        <h1 className="text-5xl pl-[22rem] font-bold">{movie.title}</h1>
        <p><span className="font-semibold">Director:</span> {movie.director}</p>
        <p><span className="font-semibold">Studio:</span> {movie.studio}</p>
        <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
        <p><span className="font-semibold">Cast:</span> {movie.movieCast.join(', ')}</p>
        <p><span className="font-semibold">Description:</span> {movie.description}</p>

        {/* Buttons for Update and Delete */}
        <div className="mt-4">
          <button
            onClick={handleUpdate}
            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      <FooterThree />
    </div>
  );
};

export default MovieDetails;
