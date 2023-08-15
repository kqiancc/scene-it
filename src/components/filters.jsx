import React, { useState } from "react";

const Filters = ({ episodes, setFilteredEpisodes }) => {
  const [filterTags, setFilterTags] = useState("");

  const handleFilterTagsChange = (event) => {
    setFilterTags(event.target.value);
  };

  const handleApplyFilter = () => {
    if (filterTags.trim() === "") {
      setFilteredEpisodes(episodes);
      return;
    }

    const filtered = episodes.filter((episode) =>
      episode.tags.some((tag) =>
        tag.toLowerCase().includes(filterTags.toLowerCase())
      )
    );
    setFilteredEpisodes(filtered);
  };

  const handleClearFilter = () => {
    setFilterTags("");
    setFilteredEpisodes(episodes);
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          filters
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <input
              type="text"
              value={filterTags}
              onChange={handleFilterTagsChange}
              placeholder="Tag Keyword"
              className="input input-bordered mb-2"
            />
          </li>
          <li>
            <button onClick={handleApplyFilter} className="btn btn-primary">
              Apply Filter
            </button>
          </li>
          <li>
            <button onClick={handleClearFilter} className="btn btn-secondary">
              Clear Filter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;