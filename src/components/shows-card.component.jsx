import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Card = () => {
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
  }, [searchTerm]); // Add searchTerm as a dependency to re-fetch when it changes

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
    <div className="carousel carousel-end rounded-box">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search TV Shows"
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      
      {Array.isArray(filteredShows) && filteredShows.length > 0 ? (
        filteredShows.map((show) => (
          <div key={show.id} className="carousel-item">
             <button onClick={() => HandleButtonClick(show)}>
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
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Card;
