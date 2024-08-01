import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { FooterThree } from '../components/Footer';

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
    <div className="movie-details">
      <Navbar />
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-[27rem] object-none"
      
        />
      )}
          <div className=" pr-[1.5rem] pl-[22rem]  mt-[30px] space-y-4">
        <h1 className="text-5xl pl-[22rem] font-bold">{movie.title}</h1>
        <p><span className="font-semibold">Director:</span> {movie.director}</p>
        <p><span className="font-semibold">Studio:</span> {movie.studio}</p>
        <p><span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
        <p><span className="font-semibold">Cast:</span> {movie.movieCast.join(', ')}</p>
        <p><span className="font-semibold">Description:</span> {movie.description}</p>
      </div>
      <FooterThree />
    </div>
  );
};

export default MovieDetails;
