import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import {Fragment} from 'react';
import Notes from '../components/notes.component';

const MovieDetails = () => {
  const location = useLocation();
  const movieId = location.state?.movie || null;
  const [userInput, setUserInput] = useState('');

  const HandleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieId.poster_path}`}
          alt={movieId.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movieId.title}</h2>
        <p>{movieId.overview}</p>
        <p>Released: {movieId.release_date}</p>
        <p>Rating: {movieId.vote_average}/10</p>
        <div className="card-actions justify-end">
          {/* Add any additional actions if needed */}
        </div>
      </div>
    </div>
    <Notes/>
  </div>
);
};


export default MovieDetails;
