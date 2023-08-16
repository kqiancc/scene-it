import React, { useState } from "react";

const Filters = ({ onFilterChange, notesTags, enteredTags }) => {
  const [filterTags, setFilterTags] = useState([]);

  const handleFilterTagsChange = () => {
    const newTags = [...filterTags];
    if (enteredTags.trim() !== "") {
      newTags.push(enteredTags.trim());
    }
    newTags.push(...notesTags);
    setFilterTags(newTags);
    onFilterChange(newTags); 
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Filters
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <div>
            {}
            <button
              onClick={handleFilterTagsChange}
              className="btn btn-primary mt-2"
            >
              Apply Filters
            </button>
          </div>
          {}
          {filterTags.map((tag, index) => (
            <div key={index} className="mb-2">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={filterTags.includes(tag)}
                onChange={() => {
                  if (filterTags.includes(tag)) {
                    setFilterTags((prevTags) => prevTags.filter((t) => t !== tag));
                  } else {
                    setFilterTags((prevTags) => [...prevTags, tag]);
                  }
                }}
              />
              <label htmlFor={`checkbox-${index}`} className="ml-2">
                {tag}
              </label>
            </div>
          ))}
          <li>
            <a></a>
          </li>
          <li>
            <a></a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
