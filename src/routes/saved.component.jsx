import React, { useEffect, useState } from "react";
import Spinner from "../firebase/spinner";
import Heart from "../components/heart";
import SavedNotes from "../components/elsewhere-notes";
import { toggleEpFav, deleteTagFromEpisode } from "../firebase/firebase";
import { getTVShowsWithTags } from "../firebase/firebase"; // Adjust the path

const TaggedEpisodesPage = ({ user }) => {
  const [taggedEpisodes, setTaggedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25"; // Insert your API key

  useEffect(() => {
    fetchTaggedEpisodesDetails();
  }, [user]);

  const fetchTaggedEpisodesDetails = async () => {
    try {
      const episodesWithTags = await getTVShowsWithTags();

      const episodesDetails = await Promise.all(
        episodesWithTags.map(async (episode) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}?api_key=${apiKey}&language=en-US`
          );
          const episodeDetails = await response.json();

          let showName = ""; // Initialize the showName variable using let

          try {
            const showResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${episode.show_id}?api_key=${apiKey}&language=en-US`
            );
            const showData = await showResponse.json();
            showName = showData.name; // Get the show name from the API response
          } catch (error) {
            console.error("Error fetching show details:", error);
          }

          return {
            ...episode,
            episode: {
              ...episodeDetails,
              tags: episode.tags || [], // assuming tags is an array
              notes: episode.notes || [], // assuming notes is a string
              isHeartClicked: true,
            },
            showName: showName,
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
            taggedEpisode.episode_name,
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

  // const handleHeartClick = async (episodeId) => {
  //   const clickedEpisode = taggedEpisodes.find(te => te.episode.episode_id === episodeId);
  //   if (!clickedEpisode) return;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return user ? (
    <div className='flex flex-col items-center'>
      <h1 className='p-5 text-5xl font-bold text-center h-28'>Saved</h1>
      {taggedEpisodes.length === 0 ? (
        <div className='mt-4 text-xl'>No saved episodes found </div>
      ) : (
        taggedEpisodes.map((taggedEpisode, index) => (
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
                  {taggedEpisode.showName} - Season{" "}
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
            {/*TESTING NEW STUFF */}
            <div className='collapse-content'>
              <Heart
                showId={taggedEpisode.show_id}
                seasonNumber={taggedEpisode.season_number}
                episodeId={taggedEpisode.episode_id}
                episodeNumber={taggedEpisode.episode_number}
                episodeName={taggedEpisode.episode_name}
                isHeartClicked={taggedEpisode.is_heart_clicked}
                handleHeartClick={handleHeartClick}
              />
              <div className='divider' />
              <SavedNotes
                episodeData={taggedEpisode}
                onTagsChange={(newTags) =>
                  handleTagsChange(taggedEpisode.episode.episode_id, newTags)
                }
                onNotesChange={(newNotes) =>
                  handleNotesChange(taggedEpisode.episode.episode_id, newNotes)
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
  ) : (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='p-5 text-5xl font-bold text-center h-28'>Saved</h1>
      <p className='mt-4 text-xl'>Log in to use this feature</p>
    </div>
  );
};

export default TaggedEpisodesPage;
