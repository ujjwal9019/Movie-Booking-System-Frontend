import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  // Fetch movies with pagination
  const fetchMovies = async (page) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage

      const response = await axios.get(`http://localhost:8080/api/v1/movie/allMoviesPage?pageNumber=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      setMovies(response.data.movieDtos);
      setIsLastPage(response.data.isLast);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(pageNumber); // Fetch movies on component mount
  }, [pageNumber]);

  return (
    <div>
      <h2>Movies</h2>
      <div>
        {movies.map(movie => (
          <div key={movie.movieId} className="card">
            <h3>{movie.title}</h3>
            <p>{movie.director}</p>
            <p>{movie.studio}</p>
            <p>{movie.releaseYear}</p>
            <img src={movie.posterUrl} alt={movie.title} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))} disabled={pageNumber === 0}>Previous</button>
        <button onClick={() => setPageNumber(prev => prev + 1)} disabled={isLastPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
