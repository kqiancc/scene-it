import React, { useState } from "react";
import DisplayEpisodes from "./display-episodes.component";
import Notes from "../components/notes.component.jsx";

const Saved = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [enteredTags, setEnteredTags] = useState("");

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "75px",
          zIndex: 1000,
        }}
      >
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary"
            >
              filters
            </label>
            {/* Tags input and Add Tag button */}
            <input
              type="text"
              value={enteredTags}
              onChange={(e) => setEnteredTags(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  if (enteredTags.trim() !== "") {
                    const newTag = enteredTags.trim();
                    setFilterTags((prevTags) => [...prevTags, newTag]);
                    setEnteredTags(""); // Clear the input after adding the tag
                  }
                }
              }}
              placeholder="Enter tags"
              className="w-full max-w-xs input input-ghost input-primary focus:outline-none"
            />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="h-full p-4 menu w-80 bg-base-200 text-base-content">
              <h3 className="mb-2 font-bold">Filter Tags</h3>
              {/* Display existing filter tags */}
              {filterTags.map((tag, index) => (
                <button
                  key={index}
                  className="mb-1 btn btn-primary"
                  onClick={() => {
                    const updatedTags = filterTags.filter((t) => t !== tag);
                    setFilterTags(updatedTags);
                  }}
                >
                  {tag}
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Pass filterTags and enteredTags as props to DisplayEpisodes */}
      <DisplayEpisodes
        filterTags={filterTags}
        enteredTags={enteredTags}
      />
    </div>
  );
};

export default Saved;
