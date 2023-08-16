import React, { useState } from "react";
import DisplayEpisodes from "./display-episodes.component"; 
import Notes from "../components/notes.component.jsx"; 
const Saved = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [enteredTags, setEnteredTags] = useState(""); // New state for entered tags

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
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">filters</label>
            {/* Tags input and Add Tag button */}
            {/* <input
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
            /> */}
            
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              <h3 className="font-bold mb-2">Filter Tags</h3>
              {/* Display existing filter tags */}
              {filterTags.map((tag, index) => (
                <button
                  key={index}
                  className="btn btn-primary mb-1"
                  onClick={() => {
                    const updatedTags = filterTags.filter((t) => t !== tag);
                    setFilterTags(updatedTags);
                  }}
                >
                  <DisplayEpisodes
        filterTags={filterTags}
        setFilterTags={setFilterTags}
        enteredTags={enteredTags}
        setEnteredTags={setEnteredTags}
      />
                  {tag}
                </button>
              ))}
              {/* Sidebar content here */}
            </ul>
          </div>
        </div>
      </div>
      {/* Pass filterTags and enteredTags as props to DisplayEpisodes */}
      <DisplayEpisodes filterTags={filterTags} enteredTags={enteredTags} />
    </div>
  );
};

export default Saved;
