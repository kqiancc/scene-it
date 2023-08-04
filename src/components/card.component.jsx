import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Card = () => {
  // State to store the API response (trending TV shows data)
  const [trendingShows, setTrendingShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const HandleButtonClick = () => {
    // Use the navigate function to navigate to the "/display-episodes" route
    navigate('/display-episodes');
  };

  useEffect(() => {
    // Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setTrendingShows(data.results);
        setFilteredShows(data.results);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

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
      <div class="form-control">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Display filteredShows if available */}
      {Array.isArray(filteredShows) && filteredShows.length > 0 ? (
        filteredShows.map((show) => (
          <div key={show.id} className="carousel-item">
            <button onClick={HandleButtonClick}>
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
        <p>No trending TV shows found.</p>
      )}
    </div>
  );
};

export default Card;
