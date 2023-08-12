import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovie, addNewMovie, updateUserMovieField } from '../firebase/firebase'; // Import your addNewMovie function
import { getAuth } from 'firebase/auth'; // Import Firebase's authentication module

const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state?.item || null;
  const [userInput, setUserInput] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [tags, setTags] = useState(() => {
    const storedTags = JSON.parse(localStorage.getItem(`tags_${movie.id}`));
    return storedTags || [];
  });
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${movie.id}`));
    return storedNotes || [];
  });

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleNotesInputChange = (event) => {
    setUserNotes(event.target.value);
  };

  const handleInputKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (userInput.trim() !== '') {
        setTags((prevTags) => {
          const newTags = [...prevTags, userInput];
          localStorage.setItem(`tags_${movie.id}`, JSON.stringify(newTags));
          return newTags;
        });

        //saving tags to firestore
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
          const existingMovie = await getMovie(movie.id)

          //check if movie already exists
          if (existingMovie){
            const old_tags = existingMovie.movie_tags
            const new_tags = [...old_tags || [], userInput]
            updateUserMovieField(movie.id,"movie_tags", new_tags)

          } else { //save movie and tag to firestore
            addNewMovie(
              movie.id,
              movie.title,
              movie.vote_average,
              [userInput], 
              []
            );
          }
        }
        setUserInput('');
      }
    }
  };

  const handleNotesKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (userNotes.trim() !== '') {
        setNotes((prevNotes) => {
          const newNotes = [...prevNotes, userNotes];
          localStorage.setItem(`notes_${movie.id}`, JSON.stringify(newNotes));
          return newNotes;
        });
       
        //saving note to firestore
        const auth = getAuth();
        const user = auth.currentUser;
        if (user){
          const existingMovie = await getMovie(movie.id)

          //check if movie already exists
          if (existingMovie){
            updateUserMovieField(movie.id,"movie_notes", userNotes)

          } else { //save movie and note to firestore
            addNewMovie(
              movie.id,
              movie.title,
              movie.vote_average,
              [], 
              [userNotes]
            );
          }
        }
        setUserNotes('');
      }
    }
  };

  useEffect(() => {
    // Initialize tags and notes from local storage on component mount
    const storedTags = JSON.parse(localStorage.getItem(`tags_${movie.id}`));
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${movie.id}`));
    if (storedTags) {
      setTags(storedTags);
    }
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, [movie]);

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Released: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}/10</p>
          <div className="card-actions justify-end">
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
