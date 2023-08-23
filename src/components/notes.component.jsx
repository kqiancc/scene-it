import { useState, useEffect } from "react";
import {
  getEpisode,
  addNewEpisode,
  updateEpisodeField,
} from "../firebase/firebase"; // Import your addNewMovie function
import { getAuth } from "firebase/auth"; // Import Firebase's authentication module
import { RiCloseLine } from "react-icons/ri";

const Notes = ({
  showId,
  showName,
  episodeData,
  onTagsChange,
  onNotesChange,
  onTagDelete,
}) => {
  const [userInput, setUserInput] = useState("");
  const [tags, setTags] = useState([]);
  const [userNotes, setUserNotes] = useState("");
  const [notesDisplay, setNotesDisplay] = useState([]);

  useEffect(() => {
    if (episodeData) {
      setUserInput("");
      setTags(episodeData.tags);
      setUserNotes(episodeData.notes);
      setNotesDisplay(episodeData.notes);
    }
  }, [episodeData]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputKeyPress = async (event) => {
    if (event.key === "Enter") {
      // Split the userInput into individual tags and trim any whitespace
      const inputTags = userInput.split(",").map((tag) => tag.trim());

      // Filter out tags that already exist in the current episode's tags
      const newTags = inputTags.filter((tag) => !tags.includes(tag));

      // If all tags from the userInput are duplicates, then return early without updating
      if (newTags.length === 0) {
        setUserInput(""); // Clear the input field
        return;
      }

      // Update the local state with the new tags
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);

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
            showName,
            episodeData.episode_number,
            [userInput],
            [],
            null,
            showId,
            episodeData.season_number
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
    const existingEpisode = await getEpisode(episodeData.id);

    if (userNotes.length <= 0 && !existingEpisode) {
      return;
    }
    // const newNotes = userNotes.split("\n").map((note) => note.trim());
    const newNotes = userNotes;

    onNotesChange(newNotes);
    setNotesDisplay((prevNotes) => [...prevNotes, ...newNotes]);
    if (user) {
      //check if movie already exists
      if (existingEpisode) {
        updateEpisodeField(episodeData.id, "episode_notes", userNotes);
      } else {
        //save episode and tag to Firestore
        addNewEpisode(
          episodeData.id,
          showName,
          episodeData.episode_number,
          [],
          [userNotes],
          null,
          showId,
          episodeData.season_number
        );
      }
    }
  };

  return (
    <div>
      <div className='card bg-base-200 rounded-box'>
        <div className='flex flex-wrap items-center space-x-2'>
          <div className='flex-none'>
            <input
              type='text'
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder='Tags'
              className='w-full max-w-xs input input-ghost input-primary focus:outline-none'
            />
          </div>
          {tags.length > 0 && (
            <div className='flex flex-wrap flex-grow gap-2 mt-4 tag-container'>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  class='badge badge-lg badge-secondary gap-2 text-base-100'
                  style={{
                    wordBreak: "break-all",
                    height: "auto",
                    padding: "",
                  }}
                >
                  <RiCloseLine
                    class='inline-block w-4 h-4 stroke-current'
                    onClick={() => onTagDelete(episodeData.id, tag)}
                  />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='divider'></div>

      <div className='grid card bg-base-200 rounded-box place-items-left'>
        <div className='place-items-center '>
          <textarea
            value={userNotes}
            onChange={handleNotesInputChange}
            onBlur={handleNotesBlur}
            placeholder='Notes'
            className='w-1/2 input input-ghost input-primary h-28 focus:outline-none'
            style={{
              overflowWrap: "break-word",
            }}
            rows={3} // Initial number of visible lines
          />
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
