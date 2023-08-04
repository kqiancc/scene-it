import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const TVShowCard = () => {
  const [trendingShows, setTrendingShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const HandleButtonClick = (showId) => {
    // Use the navigate function to navigate to the "/display-episodes" route
    navigate('/show-details', { state: { showId } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
    const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTrendingShows(data.results);
        setFilteredShows(data.results);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter the shows based on the search term
    const filteredResults = trendingShows.filter((show) =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredShows(filteredResults);
  };

  return (
    <div className="grid h-20 card bg-base-300 rounded-box place-items-center mb-4">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search TV Shows"
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {/* Display filteredShows if available */}
      {Array.isArray(filteredShows) && filteredShows.length > 0 ? (
        <div className="carousel rounded-box">
          {filteredShows.map((show) => (
            <div key={show.id} className="carousel-item">
              <button onClick={HandleButtonClick(show)}>
                <div className="relative">
                  <img
                    alt={`TV Show Poster for ${show.name}`}
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    className="w-40 h-56 object-cover rounded"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-sm font-semibold">
                    {show.name}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No TV shows found.</p>
      )}
    </div>
  );
};

const MovieCard = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Use the navigate function to navigate to the "/display-movie-details" route
    navigate('/display-movie-details', { state: { searchTerm } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovies(data.results);
        setFilteredMovies(data.results);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [searchTerm]);

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
    <div className="grid h-20 card bg-base-300 rounded-box place-items-center mb-4">
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
        <div className="carousel rounded-box">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="carousel-item">
              <button onClick={handleButtonClick}>
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
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

const Card = () => {
  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="mb-4">
        <TVShowCard />
      </div>
      <div className="divider"></div>
      <div className="mb-4">
        <MovieCard />
      </div>
    </div>
  );
};

export default Card;
