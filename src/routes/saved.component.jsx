import React, { useState } from "react";

const Saved = ({ episodes }) => {
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const [filterTags, setFilterTags] = useState([]);

  const handleFilterChange = (event) => {
    const newFilterTags = event.target.value.split(",").map((tag) => tag.trim());
    setFilterTags(newFilterTags);

    if (newFilterTags.length === 0) {
      setFilteredEpisodes(episodes);
    } else {
      const filteredEpisodes = episodes.filter((episode) =>
        episode.tags.some((tag) => newFilterTags.includes(tag))
      );
      setFilteredEpisodes(filteredEpisodes);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter tags to filter episodes"
        value={filterTags.join(", ")}
        onChange={handleFilterChange}
      />

      <div>
        {filteredEpisodes.map((episode) => (
          <div key={episode.id}>
            {//prolly api stuff yall }
            <p>{episode.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
