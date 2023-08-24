import React, { useEffect, useState } from "react";
import Spinner from "../firebase/spinner";
import Heart from "../components/heart";
import SavedNotes from "../components/elsewhere-notes";
import {
  toggleEpFav,
  deleteTagFromEpisode,
  getFavTags,
  getFavoritedEps,
} from "../firebase/firebase";
import RefreshButton from "../components/refreshbutton";

const FavoritesPage = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showSearchQuery, setShowSearchQuery] = useState("");
  const [allShows, setAllShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState("");

  const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";

  useEffect(() => {
    async function fetchData() {
      await fetchFavoritesDetails();

      if (user) {
        const tags = await getFavTags(user.uid);
        setAllTags(tags);
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const distinctShows = [...new Set(favorites.map((ep) => ep.show_name))];
    setAllShows(distinctShows);
  }, [favorites]);

  const fetchFavoritesDetails = async () => {
    try {
      const showsWithTags = await getFavoritedEps();

      const favoritesDetails = await Promise.all(
        showsWithTags.map(async (favorite) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${favorite.show_id}/season/${favorite.season_number}/episode/${favorite.episode_number}?api_key=${apiKey}&language=en-US`
          );
          const favoriteDetails = await response.json();

          return {
            ...favorite,
            episode: {
              ...favoriteDetails,
              tags: favorite.tags || [],
              notes: favorite.notes || [],
              isHeartClicked: true,
            },
          };
        })
      );

      setFavorites(favoritesDetails);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data :(");
      setLoading(false);
    }
  };

  const handleTagsChange = (episodeId, newTagsInput) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.id === episodeId
          ? {
              ...favorite,
              episode: {
                ...favorite.episode,
                // Combine existing tags with the new ones, ensuring uniqueness
                tags: [...new Set([...favorite.episode.tags, ...newTagsInput])],
              },
            }
          : favorite
      )
    );
  };

  const handleTagDelete = async (episodeId, tagToDelete) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.episode_id === episodeId
          ? {
              ...favorite,
              tags: favorite.episode.tags.filter((tag) => tag !== tagToDelete),
            }
          : favorite
      )
    );

    try {
      await deleteTagFromEpisode(episodeId, tagToDelete);
      await fetchFavoritesDetails();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleNotesChange = (episodeId, newNotes) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.id === episodeId
          ? { ...favorite, episode: { ...favorite.episode, notes: newNotes } }
          : favorite
      )
    );
  };

  const handleHeartClick = (episodeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) => {
        if (favorite.episode_id === episodeId) {
          const newHeartState = !favorite.is_heart_clicked;
          toggleEpFav(
            favorite.show_id,
            favorite.season_number,
            favorite.episode_id,
            favorite.show_name,
            favorite.episode_number,
            newHeartState
          );
          return {
            ...favorite,
            is_heart_clicked: newHeartState,
          };
        }
        return favorite;
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

  const filteredEpisodes = favorites.filter(
    (favorite) =>
      selectedTags.every((tag) => favorite.episode_tags.includes(tag)) &&
      (!selectedShow || favorite.show_name === selectedShow)
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
                  className={`mb-2 mr-2 badge badge-lg badge-secondary break-all h-auto  ${
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
                        className={`mb-2 mr-2 badge badge-lg badge-secondary break-all h-auto${
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
        <h1 className='p-5 text-5xl font-bold text-center h-28'>Favorites</h1>
        {favorites.length === 0 && !loading ? (
          <div className='mt-4 text-xl'>No favorited episodes found</div>
        ) : filteredEpisodes.length === 0 && !loading ? (
          <div className='mt-4 text-xl'>
            No episodes found with selected filters
          </div>
        ) : (
          filteredEpisodes.map((favorite, index) => (
            <div
              key={index}
              className='w-9/12 collapse collapse-plus bg-base-200 '
            >
              <input
                type='checkbox'
                name='my-accordion-3 flex flex-row items-center'
              />
              <div className='flex items-center text-xl collapse-title'>
                <figure className='flex-shrink-0 float-left m-4'>
                  {favorite.episode.still_path ? (
                    <img
                      className='rounded-lg'
                      src={`https://image.tmdb.org/t/p/w500${favorite.episode.still_path}`}
                      alt={`Episode ${favorite.episode.episode_number} - ${favorite.episode.name}`}
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
                    {favorite.show_name} - Season {favorite.season_number}
                  </h3>
                  <h2 className='text-2xl font-bold'>
                    Episode {favorite.episode.episode_number}:{" "}
                    {favorite.episode.name}
                  </h2>
                  <h1 className='italic'>
                    {favorite.episode.vote_average}/10 -{" "}
                    {favorite.episode.runtime} minutes
                  </h1>
                  <h1 className='italic'>
                    Aired: {favorite.episode.air_date}{" "}
                  </h1>
                  <p>{favorite.episode.overview}</p>
                  <div className='justify-end card-actions'></div>
                </div>
              </div>
              {/*TESTING NEW STUFF */}
              <div className='collapse-content'>
                <Heart
                  showId={favorite.show_id}
                  seasonNumber={favorite.season_number}
                  episodeId={favorite.episode_id}
                  episodeNumber={favorite.episode_number}
                  showName={favorite.show_name}
                  isHeartClicked={favorite.is_heart_clicked}
                  handleHeartClick={handleHeartClick}
                />
                <div className='divider' />
                <SavedNotes
                  episodeData={favorite}
                  showName={favorite.show_name}
                  onTagsChange={(newTags) =>
                    handleTagsChange(favorite.episode.episode_id, newTags)
                  }
                  onNotesChange={(newNotes) =>
                    handleNotesChange(favorite.episode.episode_id, newNotes)
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
  ) : (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='p-5 text-5xl font-bold text-center h-28'>Favorites</h1>
      <p className='mt-4 text-xl'>Log in to use this feature</p>
    </div>
  );
};

export default FavoritesPage;
