import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Card = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const HandleButtonClick = (movie) => {
    // Use the navigate function to navigate to the "/movie-details" route
    navigate('/movie-details', { state: { movie } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25'; // Replace this with your actual TMDB API key
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(data.results);
        setFilteredMovies(data.results);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [searchTerm]); // Add searchTerm as a dependency to re-fetch when it changes

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter the movies based on the search term
    const filteredResults = trendingMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filteredResults);
  };

  return (
    <div className="carousel carousel-end rounded-box">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search Movies"
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Display filteredMovies if available */}
      {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div key={movie.id} className="carousel-item">
            <button onClick={() => HandleButtonClick(movie)}>
              <div className="relative">
                <img
                  alt={`Movie Poster for ${movie.title}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-40 h-56 object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-sm font-semibold">
                  {movie.title}
                </div>
              </div>
            </button>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Card;
