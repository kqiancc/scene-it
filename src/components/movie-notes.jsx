import React, { useState, useEffect } from "react";
import { getMovie, addNewMovie, updateMovieField } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { RiCloseLine } from "react-icons/ri";

const MovieNotes = ({ movieId, movieData, onTagsChange, onNotesChange, onTagDelete }) => {
  const [userInput, setUserInput] = useState("");
  const [tags, setTags] = useState([]);
  const [userNotes, setUserNotes] = useState("");
  const [notesDisplay, setNotesDisplay] = useState([]);

  useEffect(() => {
    if (movieData) {
      
      setUserInput("");
      console.log("Tags:", movieData.movie_tags);
      setTags(movieData.tags || []); // Set the initial state of tags
      setUserNotes(movieData.notes || "");
      setNotesDisplay(movieData.notes || []);
    }
  }, [movieData]);
  

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputKeyPress = async (event) => {
    if (event.key === "Enter") {
      const newTags = userInput.split(",").map((tag) => tag.trim());
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
       
        const existingMovie = await getMovie(movieData.id);

        if (existingMovie) {
          const oldTags = existingMovie.movie_tags;
          const updatedTags = [...oldTags, ...newTags];
          updateMovieField(movieData.id, "movie_tags", updatedTags);
        } else {
          addNewMovie(
            movieData.id,
            movieData.title,
            [userInput],
            []
          );
        }
      }
    }
  };

  const handleNotesInputChange = (event) => {
    const inputValue = event.target.value;
    setUserNotes(inputValue);
  };

  const handleNotesBlur = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const existingMovie = await getMovie(movieData.id);

    if (userNotes.length <= 0 && !existingMovie) {
      return;
    }

    onNotesChange(userNotes);
    setNotesDisplay((prevNotes) => [...prevNotes, userNotes]);

    if (user) {
      if (existingMovie) {
        updateMovieField(movieData.id, "movie_notes", userNotes);
      } else {
        addNewMovie(
          movieData.id,
          movieData.title,
          [],
          [userNotes]
        );
      }
    }
  };

  return (
    <div>
      <div className="grid h-10 card bg-base-200 rounded-box">
        <div className="flex items-center space-x-2">
          <div className="place-items-center">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Tags"
              className="w-full max-w-xs input input-ghost input-primary focus:outline-none"
            />
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 tag-container">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="gap-2 badge badge-lg badge-secondary text-base-100"
                >
                  <RiCloseLine
                    className="inline-block w-4 h-4 stroke-current"
                    onClick={() => onTagDelete(movieData.id, tag)}
                  />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="grid card bg-base-200 rounded-box place-items-left">
        <div className="place-items-center ">
          <textarea
            value={userNotes}
            onChange={handleNotesInputChange}
            onBlur={handleNotesBlur}
            placeholder="Notes"
            className="w-1/2 input input-ghost input-primary h-28 focus:outline-none"
            style={{
              overflowWrap: "break-word",
            }}
            rows={3} // Initial number of visible lines
          />
        </div>
      </div>

      {notesDisplay && notesDisplay.length > 0 && (
        <div
          className={`tag-container mt-2 ${
            notesDisplay.length > 1 ? "flex-wrap" : ""
          }`}
        ></div>
      )}
    </div>
  );
};

export default MovieNotes;
