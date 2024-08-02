import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { FooterThree } from '../components/Footer';

const UpdateMovie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'movieCast') {
      setMovie({
        ...movie,
        movieCast: value.split(',').map((castMember) => castMember.trim()),
      });
    } else {
      setMovie({
        ...movie,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('movieDtoObj', JSON.stringify(movie));

    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:8080/api/v1/movie/update/${movieId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error('Update failed:', error.response || error);
      // Handle error (show user notification or message)
    } finally {
      setLoading(false);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Update Movie</h1>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Director:</label>
            <input
              type="text"
              name="director"
              value={movie.director}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Studio:</label>
            <input
              type="text"
              name="studio"
              value={movie.studio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cast (comma separated):</label>
            <input
              type="text"
              name="movieCast"
              value={movie.movieCast.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Release Year:</label>
            <input
              type="number"
              name="releaseYear"
              value={movie.releaseYear}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Poster:</label>
            <input
              type="text"
              name="poster"
              value={movie.poster}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Poster URL:</label>
            <input
              type="text"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
       
          <div className="mb-4">
            <label className="block text-gray-700">Poster Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
         
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
          >
            {loading ? 'Updating...' : 'Update Movie'}
          </button>
        </form>
      </div>
      <FooterThree />
    </div>
  );
};

export default UpdateMovie;
