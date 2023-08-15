import React, { useState } from "react";
import DisplayEpisodes from "./display-episodes.component"; // Adjust the import path based on your project structure

const Saved = () => {
  const [filterTags, setFilterTags] = useState([]);
  
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
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              
              <h3 className="font-bold mb-2">Filter Tags</h3>
              {filterTags.map((tag, index) => (
                <button
                  key={index}
                  className="btn btn-primary mb-1"
                  onClick={() => {
                    // Handle tag removal
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
    
      <DisplayEpisodes filterTags={filterTags} />
    </div>
  );
};

export default Saved;