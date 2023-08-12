// const SearchBar = (label) => {

// return (
//      <div className="form-control">
//       <input type="text" placeholder="Search" className="input input-bordered md:w-fit" />
//       </div>
//     );}

//     export default SearchBar;

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const HandleButtonClick = (item, type) => {
    navigate(`/${type}-details`, { state: { item } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
    const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apiKey}`;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`;

    const fetchTvShows = fetch(tvUrl).then((res) => res.json());
    const fetchMovies = fetch(movieUrl).then((res) => res.json());

    Promise.all([fetchTvShows, fetchMovies])
      .then(([tvData, movieData]) => {
        const combinedResults = [
          ...tvData.results.map((show) => ({ ...show, type: 'tv' })),
          ...movieData.results.map((movie) => ({ ...movie, type: 'movie' })),
        ];
        setItems(combinedResults);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="carousel carousel-end rounded-box">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search TV Shows and Movies"
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="divider-vertical"></div>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="carousel-item">
            <button onClick={() => HandleButtonClick(item, item.type)}>
              <div className="relative">
                <img
                  alt={`${item.type === 'tv' ? 'TV Show Poster for' : 'Movie Poster for'} ${item.name || item.title}`}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-40 h-56 object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-sm font-semibold">
                  {item.name || item.title}
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

export default SearchBar;
