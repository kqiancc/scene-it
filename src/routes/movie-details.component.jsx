import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Fragment } from 'react';

const MovieDetails = () => {
  const location = useLocation();
  const movieId = location.state?.movie || null;
  const [userInput, setUserInput] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleNotesInputChange = (event) => {
    setUserNotes(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (userInput.trim() !== '') {
        setTags([...tags, userInput]);
        setUserInput('');
      }
    }
  };

  const handleNotesKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (userNotes.trim() !== '') {
        setNotes([...notes, userNotes]);
        setUserNotes('');
      }
    }
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

      <div className="flex flex-col w-full">
        <div className="grid h-10 card base-200 rounded-box place-items-left">
          <div className="place-items-center">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Personal tags"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <div className="divider divider-horizontal"></div>
            <div className="tag-container">
              {/* Display tags from the first input box */}
              {tags.map((tag, index) => (
                <div key={index} className="badge badge-secondary mx-1">
                  {tag}
                </div>
              ))}
            </div>
            <div className="grid h-10 flex-grow card base-200 rounded-box place-items-center">
              {/* Empty container for the tags */}
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="grid h-10 card bg-base-100 rounded-box place-items-left">
        <input
          type="text"
          value={userNotes}
          onChange={handleNotesInputChange}
          onKeyPress={handleNotesKeyPress}
          placeholder="Personal notes"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <div className="tag-container flex flex-wrap mt-2">
        {/* Display tags from the second input box */}
        {notes.map((note, index) => (
          <div key={index} className="badge badge-secondary mx-1">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
