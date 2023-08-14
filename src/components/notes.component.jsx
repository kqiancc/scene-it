import { useState, useEffect } from "react";
import {
  getEpisode,
  addNewEpisode,
  updateEpisodeField,
} from "../firebase/firebase"; // Import your addNewMovie function
import { getAuth } from "firebase/auth"; // Import Firebase's authentication module
import { RiCloseLine } from "react-icons/ri";

const Notes = ({ episodeData, onTagsChange, onNotesChange, onTagDelete }) => {
  const [userInput, setUserInput] = useState("");
  const [tags, setTags] = useState([]);
  const [userNotes, setUserNotes] = useState("");
  const [notesDisplay, setNotesDisplay] = useState([]);

  useEffect(() => {
    if (episodeData) {
      setUserInput("");
      setTags(episodeData.tags);
      setUserNotes(episodeData.notes.join("\n"));
      setNotesDisplay(episodeData.notes);
    }
  }, [episodeData]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputKeyPress = async (event) => {
    if (event.key === "Enter") {
      const newTags = userInput.split(",").map((tag) => tag.trim());
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);
      console.log(newTags);

      //saving tags to firestore
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const existingEpisode = await getEpisode(episodeData.id);

        //check if episode already exists
        if (existingEpisode) {
          const old_tags = existingEpisode.episode_tags;
          const new_tags = [...old_tags, userInput];
          updateEpisodeField(episodeData.id, "episode_tags", new_tags);
        } else {
          //save episode and tag to firestore
          addNewEpisode(
            episodeData.id,
            episodeData.name,
            episodeData.vote_average,
            [userInput],
            []
          );
          setUserInput("");
        }
      }
    }
  };

  const handleNotesInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 2000) {
      setUserNotes(inputValue);
    }
  };

  const handleNotesBlur = async () => {
    const newNotes = userNotes.split("\n").map((note) => note.trim());
  
    if (newNotes.length > 0) {
      onNotesChange(newNotes);
      setNotesDisplay((prevNotes) => [...prevNotes, ...newNotes]);
  
      // Saving note to Firestore
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const existingEpisode = await getEpisode(episodeData.id);
  
        // Check if movie already exists
        if (existingEpisode) {
          updateEpisodeField(episodeData.id, "episode_notes", userNotes);
        } else {
          // Save episode and tag to Firestore
          addNewEpisode(
            episodeData.id,
            episodeData.name,
            episodeData.vote_average,
            [],
            [userNotes]
          );
          setUserNotes("");
        }
      }
    }
  };

  return (
    <div>
      <div className="grid h-10 card bg-base-200 rounded-box place-items-left">
        <div className="place-items-center">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Tags"
            className="input input-ghost input-primary w-full max-w-xs focus:outline-none"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="tag-container flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-secondary mx-1">
              {tag}
              <RiCloseLine
                onClick={() => onTagDelete(episodeData.id, tag)}
              ></RiCloseLine>
            </div>
          ))}
        </div>
      )}

      <div className="divider"></div>

      <div className="grid card bg-base-200 rounded-box place-items-left">
        <div className="place-items-center ">
          <textarea
            value={userNotes}
            onChange={handleNotesInputChange}
            onBlur={handleNotesBlur} 
            placeholder="Notes"
            className="input input-ghost input-primary w-1/2 h-28 focus:outline-none"
            style={{
              overflowWrap: "break-word",
            }}
            rows={3} // Initial number of visible lines
          />
          <div className="text-xs mt-1 text-base-content">
            {userNotes.length} / 2000 characters
          </div>
        </div>
      </div>

      {notesDisplay.length > 0 && (
        <div
          className={`tag-container mt-2 ${
            notesDisplay.length > 1 ? "flex-wrap" : ""
          }`}
        ></div>
      )}
    </div>
  );
};

export default Notes;
