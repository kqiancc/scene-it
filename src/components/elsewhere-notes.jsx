import { useState, useEffect } from "react";
import {
  getEpisode,
  addNewEpisode,
  updateEpisodeField,
} from "../firebase/firebase"; // Import your addNewMovie function
import { getAuth } from "firebase/auth"; // Import Firebase's authentication module
import { RiCloseLine } from "react-icons/ri";

const ElsewhereNotes = ({ episodeData, onTagsChange, onNotesChange, onTagDelete }) => {
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
    console.log(userInput, 'before')
    if (event.key === "Enter") {
      const newTags = userInput.split(",").map((tag) => tag.trim());
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);
      console.log(userInput);
      setUserInput("");
      //saving tags to firestore
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const existingEpisode = await getEpisode(episodeData.episodeId);

        //check if episode already exists
        if (existingEpisode) {
          const old_tags = existingEpisode.episode_tags;
          const new_tags = [...old_tags, userInput];
          updateEpisodeField(episodeData.episodeId, "episode_tags", new_tags);
        } else {
          //save episode and tag to firestore
          addNewEpisode(
            episodeData.episodeId,
            episodeData.episodeName,
            episodeData.episodeNumber,
            [userInput],
            [],
            null
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
    const existingEpisode = await getEpisode(episodeData.episodeId);
    

    console.log(userNotes);
    if (userNotes.length <= 0 && !existingEpisode) {
      return;
    }
    console.log(userNotes.length);
    // const newNotes = userNotes.split("\n").map((note) => note.trim());
    const newNotes = userNotes;

    console.log("new notes", newNotes);

    onNotesChange(newNotes);
    setNotesDisplay((prevNotes) => [...prevNotes, ...newNotes]);
    if (user) {
      //check if movie already exists
      if (existingEpisode) {
        updateEpisodeField(episodeData.episodeId, "episode_notes", userNotes);
      } else {
        //save episode and tag to Firestore
        console.log("im here!");
        console.log(episodeData.episodeId)
        addNewEpisode(
            episodeData.episodeId,
            episodeData.episodeName,
            episodeData.episodeNumber,
          [],
          [userNotes],
          null
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
                  class="badge badge-lg badge-secondary gap-2 text-base-100"
                >
                  <RiCloseLine
                    class="inline-block w-4 h-4 stroke-current"
                    onClick={() => onTagDelete(episodeData.episodeId, tag)}
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

export default ElsewhereNotes;
