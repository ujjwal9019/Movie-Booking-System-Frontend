import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { FooterThree } from '../components/Footer';
import { TERipple } from 'tw-elements-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
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
      setTotalPages(response.data.totalPages); // Assuming the API returns totalPages
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
      <Navbar />
      <div className="flex flex-wrap gap-14 p-6">
        {movies.map((movie) => (
          <div
            key={movie.movieId}
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 cursor-pointer"
            onClick={() => handleCardClick(movie.movieId)}
          >
            <a href="#!">
              <img
                className="rounded-t-lg h-[100px]"
                src={movie.posterUrl}
                alt={movie.title}
                  loading="lazy"
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {movie.title}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Director: {movie.director}
                <br />
                Studio: {movie.studio}
                <br />
                Release Year: {movie.releaseYear}
              </p>
              <TERipple>
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  View more
                </button>
              </TERipple>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 p-6">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          disabled={pageNumber === 0}
          className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
            pageNumber === 0 ? 'cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setPageNumber(page)}
            className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
              pageNumber === page ? 'bg-gray-100' : ''
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={isLastPage}
          className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
            isLastPage ? 'cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
      <FooterThree />
    </div>
  );
};

export default Home;
