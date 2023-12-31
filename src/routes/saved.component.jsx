import React, { useEffect, useState } from "react";
import Spinner from "../firebase/spinner";
import Heart from "../components/heart";
import SavedNotes from "../components/elsewhere-notes";
import {
  getTVShowsWithTags,
  toggleEpFav,
  deleteTagFromEpisode,
  getAllTags,
} from "../firebase/firebase";
import RefreshButton from "../components/refreshbutton";

const TaggedEpisodesPage = ({ user }) => {
  const [taggedEpisodes, setTaggedEpisodes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedShow, setSelectedShow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchQuery, setShowSearchQuery] = useState("");

  const [allShows, setAllShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25"; // Insert your API key

  useEffect(() => {
    async function fetchData() {
      await fetchTaggedEpisodesDetails();

      // Fetch all tags for the given user
      if (user) {
        const tags = await getAllTags(user.uid);
        setAllTags(tags);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const distinctShows = [
      ...new Set(taggedEpisodes.map((ep) => ep.show_name)),
    ];
    setAllShows(distinctShows);
  }, [taggedEpisodes]);

  const fetchTaggedEpisodesDetails = async () => {
    try {
      const episodesWithTags = await getTVShowsWithTags();

      const episodesDetails = await Promise.all(
        episodesWithTags.map(async (episode) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}?api_key=${apiKey}&language=en-US`
          );
          const episodeDetails = await response.json();

          return {
            ...episode,
            episode: {
              ...episodeDetails,
              tags: episode.tags || [], // assuming tags is an array
              notes: episode.notes || [], // assuming notes is a string
              isHeartClicked: true,
            },
          };
        })
      );

      setTaggedEpisodes(episodesDetails);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data :(");
      setLoading(false);
    }
  };

  const handleTagsChange = (episodeId, newTags) => {
    setTaggedEpisodes((prevTaggedEpisodes) =>
      prevTaggedEpisodes.map((taggedEpisode) =>
        taggedEpisode.episode.id === episodeId
          ? {
              ...taggedEpisode,
              episode: { ...taggedEpisode.episode, tags: newTags },
            }
          : taggedEpisode
      )
    );
  };

  const handleTagDelete = async (episodeId, tagToDelete) => {
    // 1. Update the UI immediately
    setTaggedEpisodes((prevTaggedEpisodes) =>
      prevTaggedEpisodes.map((taggedEpisode) =>
        taggedEpisode.episode.episode_id === episodeId
          ? {
              ...taggedEpisode,
              tags: taggedEpisode.episode.tags.filter(
                (tag) => tag !== tagToDelete
              ),
            }
          : taggedEpisode
      )
    );

    // 2. Delete the tag from the backend
    try {
      await deleteTagFromEpisode(episodeId, tagToDelete);

      // 3. Re-fetch data to sync with backend
      await fetchTaggedEpisodesDetails();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleNotesChange = (episodeId, newNotes) => {
    setTaggedEpisodes((prevTaggedEpisodes) =>
      prevTaggedEpisodes.map((taggedEpisode) =>
        taggedEpisode.episode.id === episodeId
          ? {
              ...taggedEpisode,
              episode: { ...taggedEpisode.episode, notes: newNotes },
            }
          : taggedEpisode
      )
    );
  };

  const handleHeartClick = (episodeId) => {
    setTaggedEpisodes((prevTaggedEpisodes) =>
      prevTaggedEpisodes.map((taggedEpisode) => {
        if (taggedEpisode.episode_id === episodeId) {
          const newHeartState = !taggedEpisode.is_heart_clicked;
          toggleEpFav(
            taggedEpisode.show_id,
            taggedEpisode.season_number,
            taggedEpisode.episode_id,
            taggedEpisode.show_name,
            taggedEpisode.episode_number,
            newHeartState
          );
          return {
            ...taggedEpisode,
            is_heart_clicked: newHeartState,
          };
        }
        return taggedEpisode;
      })
    );
  };

  //FILTER STUFF
  // Event handler to set the value of selectedTag when a tag is clicked
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  // Clear the filter to show all episodes again
  const clearFilter = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const filteredEpisodes = taggedEpisodes.filter(
    (taggedEpisode) =>
      selectedTags.every((tag) => taggedEpisode.episode_tags.includes(tag)) &&
      (!selectedShow || taggedEpisode.show_name === selectedShow)
  );

  const clearShowFilter = () => {
    setSelectedShow(""); // This will reset the selectedShow state to its initial empty string value.
    setShowSearchQuery("");
  };

  const filteredShows = showSearchQuery
    ? allShows.filter((show) =>
        show.toLowerCase().includes(showSearchQuery.toLowerCase())
      )
    : allShows;

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
    setSelectedShow(""); // This will reset the selectedShow state to its initial empty string value.
    setShowSearchQuery("");
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return user ? (
    <div className='grid h-full grid-cols-6'>
      <div className='sticky top-0 h-screen col-span-1 overflow-y-auto rounded-xl bg-base-200'>
        <div className='p-2'>
          <div className='flex items-center justify-between p-2 mb-4'>
            <h1 className='text-xl font-bold'>Filters</h1>
            <RefreshButton />
          </div>
          <div class='collapse collapse-plus border'>
            <input type='checkbox' />
            <div class='collapse-title text-xl font-medium'>Filter Shows</div>
            <div class='collapse-content'>
              <div class='form-control w-full max-w-xs'>
                <input
                  type='text'
                  placeholder='Search Shows'
                  value={showSearchQuery}
                  onChange={(e) => setShowSearchQuery(e.target.value)}
                  className='w-full max-w-xs focus:outline-none input input-bordered bg-base-200'
                />
                <label class='label'>
                  <button
                    onClick={clearShowFilter}
                    className='text-sm label-text-alt'
                  >
                    Clear Filter
                  </button>
                </label>
              </div>

              {filteredShows.map((show) => (
                <button
                  key={show}
                  className={`mb-2 mr-2 badge badge-lg badge-secondary break-all h-auto ${
                    selectedShow === show ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() =>
                    setSelectedShow(show === selectedShow ? "" : show)
                  }
                >
                  {show}
                </button>
              ))}
            </div>
          </div>
          <div class='collapse collapse-plus border mt-2'>
            <input type='checkbox' />
            <div class='collapse-title text-xl font-medium'>Filter Tags</div>
            <div class='collapse-content'>
              <div class='form-control w-full max-w-xs'>
                <input
                  type='text'
                  placeholder='Search Tags'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full max-w-xs focus:outline-none input input-bordered bg-base-200'
                />
                <label class='label'>
                  <button
                    onClick={clearFilter}
                    className='text-sm label-text-alt'
                  >
                    Clear Filters
                  </button>
                </label>
              </div>
              <ul className=''>
                {/* Add onClick event to each tag */}
                {allTags.length === 0 ? (
                  <div className='text-lg text-center'>
                    No tags to filter by
                  </div>
                ) : (
                  allTags
                    .sort((a, b) => a.localeCompare(b))
                    .filter((tag) =>
                      tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((tag, index) => (
                      <button
                        key={index}
                        className={`mb-2 mr-2 badge badge-lg badge-secondary break-all h-auto ${
                          selectedTags.includes(tag)
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => {
                          // Check if the tag is already in the selectedTags array
                          if (selectedTags.includes(tag)) {
                            setSelectedTags((prevTags) =>
                              prevTags.filter((t) => t !== tag)
                            ); // Remove the tag
                          } else {
                            setSelectedTags((prevTags) => [...prevTags, tag]); // Add the tag
                          }
                          handleTagClick(tag);
                        }}
                      >
                        {tag}
                      </button>
                    ))
                )}
              </ul>
            </div>
          </div>
          <div className='flex items-center justify-center mt-4'>
            <button onClick={clearAllFilters} className='text-sm'>
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center col-span-5'>
        <h1 className='p-5 text-5xl font-bold h-28'>Saved</h1>
        <div className='flex flex-col items-center'>
          {taggedEpisodes.length === 0 && !loading ? (
            <div className='mt-4 text-xl'>No saved episodes found </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className='mt-4 text-xl'>
              No episodes found with selected filters
            </div>
          ) : (
            filteredEpisodes.map((taggedEpisode, index) => (
              <div
                key={index}
                className='w-9/12 collapse collapse-plus bg-base-200'
              >
                <input
                  type='checkbox'
                  name='my-accordion-3 flex flex-row items-center'
                />
                <div className='flex items-center text-xl collapse-title'>
                  <figure className='flex-shrink-0 float-left m-4'>
                    {taggedEpisode.episode.still_path ? (
                      <img
                        className='rounded-lg'
                        src={`https://image.tmdb.org/t/p/w500${taggedEpisode.episode.still_path}`}
                        alt={`Episode ${taggedEpisode.episode.episode_number} - ${taggedEpisode.episode.name}`}
                        style={{ width: "300px", height: "auto" }}
                      />
                    ) : (
                      <div
                        style={{ width: "300px", height: "175px" }}
                        className='flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content'
                      >
                        No Poster Image Currently Found
                      </div>
                    )}
                  </figure>
                  <div className='select-text card-body'>
                    <h3 className='text-3xl font-bold'>
                      {taggedEpisode.show_name} - Season{" "}
                      {taggedEpisode.season_number}
                    </h3>
                    <h2 className='text-2xl font-bold'>
                      Episode {taggedEpisode.episode.episode_number}:{" "}
                      {taggedEpisode.episode.name}
                    </h2>
                    <h1 className='italic'>
                      {taggedEpisode.episode.vote_average}/10 -{" "}
                      {taggedEpisode.episode.runtime} minutes
                    </h1>
                    <h1 className='italic'>
                      Aired: {taggedEpisode.episode.air_date}{" "}
                    </h1>
                    <p>{taggedEpisode.episode.overview}</p>
                    <div className='justify-end card-actions'></div>
                  </div>
                </div>

                <div className='collapse-content'>
                  <Heart
                    showId={taggedEpisode.show_id}
                    seasonNumber={taggedEpisode.season_number}
                    episodeId={taggedEpisode.episode_id}
                    episodeNumber={taggedEpisode.episode_number}
                    showName={taggedEpisode.show_name}
                    isHeartClicked={taggedEpisode.is_heart_clicked}
                    handleHeartClick={handleHeartClick}
                  />
                  <div className='divider' />
                  <SavedNotes
                    episodeData={taggedEpisode}
                    onTagsChange={(newTags) =>
                      handleTagsChange(
                        taggedEpisode.episode.episode_id,
                        newTags
                      )
                    }
                    onNotesChange={(newNotes) =>
                      handleNotesChange(
                        taggedEpisode.episode.episode_id,
                        newNotes
                      )
                    }
                    onTagDelete={(episodeId, tagToDelete) =>
                      handleTagDelete(episodeId, tagToDelete)
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='p-5 text-5xl font-bold text-center h-28'>Saved</h1>
      <p className='mt-4 text-xl'>Log in to use this feature</p>
    </div>
  );
};

export default TaggedEpisodesPage;
