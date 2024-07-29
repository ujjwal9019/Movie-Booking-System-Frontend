import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/api/v1/movie/allMoviesPage?pageNumber=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(response.data.movieDtos);
      setIsLastPage(response.data.isLast);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(pageNumber);
  }, [pageNumber]);

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h2>Movies</h2>
      <div>
        {movies.map((movie) => (
          <div key={movie.movieId} className="card" onClick={() => handleCardClick(movie.movieId)}>
            <h3>{movie.title}</h3>
            <p>{movie.director}</p>
            <p>{movie.studio}</p>
            <p>{movie.releaseYear}</p>
            <img src={movie.posterUrl} alt={movie.title} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))} disabled={pageNumber === 0}>
          Previous
        </button>
        <button onClick={() => setPageNumber((prev) => prev + 1)} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
