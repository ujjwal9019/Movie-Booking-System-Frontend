// MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams(); // Get the movieId from the route parameters
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8080/api/v1/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Studio: {movie.studio}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Cast: {movie.movieCast.join(', ')}</p>
      <img src={movie.posterUrl} alt={movie.title} />
    </div>
  );
};

export default MovieDetails;
