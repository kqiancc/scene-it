import {Component} from 'react';
import {useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Card = () => {
  // State to store the API response (trending TV shows data)
  const [trendingShows, setTrendingShows] = useState([]);

  const navigate = useNavigate();
   
  const HandleButtonClick = () => {
    // Use the navigate function to navigate to the "/about" route
    navigate('/display-show');
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
      .then(res => res.json())
      .then(data => setTrendingShows(data.results))
      .catch(err => console.error('Error fetching data:', err));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <button className='card-container' onClick = {HandleButtonClick}>
      {/* Display trendingShows if available */}
      {Array.isArray(trendingShows) && trendingShows.length > 0 ? (
        <div>
          <h3>Trending TV Shows</h3>
          <div className="show-list">
            {trendingShows.map(show => (
              <div key={show.id} className="show-item">
                <img
                  alt={`TV Show Poster for ${show.name}`}
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                />
                <h4>{show.name}</h4>
                <p>First Air Date: {show.first_air_date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No trending TV shows found.</p>
      )}
    </button>
  );
};

export default Card;