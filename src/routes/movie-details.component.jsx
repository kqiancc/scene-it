import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MovieDetails = () => {
  const location = useLocation();
  const movieId = location.state?.movie || null;

  return (
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
        <div className="card-actions justify-end">{/* Add any additional actions if needed */}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
