import React, { useEffect, useState } from "react";
import { getFavorites, getFavEpisodes } from "../firebase/firebase";
import Spinner from "../firebase/spinner";
import ElsewhereNotes from "../components/favorites-notes";
import Heart from "../components/heart";
import {
  toggleEpFav,
  deleteTagFromEpisode,
} from "../firebase/firebase";
//race condition for heart thingy
//set a state for the heart in this file
//set use effect to update with that too
//make sure that the data is gotten first before updating, so refer back to the delete tags

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoritesAndEpisodes();
  }, [userUid]);

  const fetchFavoritesAndEpisodes = async () => {
    try {
      const favoritesData = await getFavorites();
      const episodesData = await getFavEpisodes();
      const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";

      const favoritesWithDetails = await Promise.all(
        favoritesData.map(async (favorite) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${favorite.showId}/season/${favorite.seasonNumber}/episode/${favorite.episodeNumber}?api_key=${apiKey}&language=en-US`
          );
          const episodeDetails = await response.json();

          const matchingEpisode = episodesData.find(
            (episode) => episode.episode_id === favorite.episodeId
            
          );
         

          let showName = ""; // Initialize the showName variable using let

          try {
            const showResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${favorite.showId}?api_key=${apiKey}&language=en-US`
            );
            const showData = await showResponse.json();
            showName = showData.name; // Get the show name from the API response
          } catch (error) {
            console.error("Error fetching show details:", error);
          }

          return {
            ...favorite,
            episode: episodeDetails,
            showName: showName,
            isHeartClicked: true,
            tags:
              matchingEpisode && matchingEpisode.episode_tags
                ? matchingEpisode.episode_tags
                : [],
            notes:
              matchingEpisode && matchingEpisode.episode_notes
                ? matchingEpisode.episode_notes
                : [],
          };
        })
      );

      setFavorites(favoritesWithDetails);
      setLoading(false);
    } catch (error) {
      setError("error fetching data :(");
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const handleTagsChange = (episodeId, newTags) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.id === episodeId
          ? { ...favorite, episode: { ...favorite.episode, tags: newTags } }
          : favorite
      )
    );
  };

  const handleTagDelete = async (episodeId, tagToDelete) => {
    // 1. Update the UI immediately
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.episodeId === episodeId
          ? {
              ...favorite,
              tags: favorite.episode.tags.filter((tag) => tag !== tagToDelete),
            }
          : favorite
      )
    );

    // 2. Delete the tag from the backend
    try {
      await deleteTagFromEpisode(episodeId, tagToDelete);

      // 3. Re-fetch data to sync with backend
      await fetchFavoritesAndEpisodes();
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
        if (favorite.episode.episodeId === episodeId) {
          const newHeartState = !favorite.episode.isHeartClicked;
          console.log("HSLDFJSDL", newHeartState);
          toggleEpFav(
            favorite.showId,
            favorite.seasonNumber,
            favorite.episode.episodeId,
            favorite.episode.episodeName,
            favorite.episode.episodeNumber,
            newHeartState
          );
          return {
            ...favorite,
            episode: { ...favorite.episode, isHeartClicked: newHeartState },
          };
        }
        return favorite;
      })
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-5 text-5xl font-bold text-center h-28">Favorites</h1>
      {favorites.map((favorite, index) => (
        <div key={index} className="w-9/12 collapse collapse-plus bg-base-200 ">
          <input
            type="checkbox"
            name="my-accordion-3 flex flex-row items-center"
          />
          <div className="flex items-center text-xl collapse-title">
            <figure className="flex-shrink-0 float-left m-4">
              {favorite.episode.still_path ? (
                <img
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${favorite.episode.still_path}`}
                  alt={`Episode ${favorite.episode.episode_number} - ${favorite.episode.name}`}
                  style={{ width: "300px", height: "auto" }}
                />
              ) : (
                <div
                  style={{ width: "300px", height: "175px" }}
                  className="flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content"
                >
                  No Poster Image Currently Found
                </div>
              )}
            </figure>
            <div className="select-text card-body">
              <h3 className="text-3xl font-bold">
                {favorite.showName} - Season {favorite.seasonNumber}
              </h3>
              <h2 className="text-2xl font-bold">
                Episode {favorite.episode.episode_number}:{" "}
                {favorite.episode.name}
              </h2>
              <h1 className="italic">
                {favorite.episode.vote_average}/10 - {favorite.episode.runtime}{" "}
                minutes
              </h1>
              <h1 className="italic">Aired: {favorite.episode.air_date} </h1>
              <p>{favorite.episode.overview}</p>
              <div className="justify-end card-actions"></div>
            </div>
          </div>
          {/*TESTING NEW STUFF */}
          <div className="collapse-content">
            <Heart
              showId={favorite.episode.showId}
              seasonNumber={favorite.episode.seasonNumber}
              episodeId={favorite.episode.episodeId}
              episodeNumber={favorite.episode.episodeNumber}
              episodeName={favorite.episode.episodeName}
              isHeartClicked={favorite.episode.isHeartClicked}
              handleHeartClick={handleHeartClick}
            />
            <div className="divider" />
            <ElsewhereNotes
              episodeData={favorite}
              onTagsChange={(newTags) =>
                handleTagsChange(favorite.episode.episodeId, newTags)
              }
              onNotesChange={(newNotes) =>
                handleNotesChange(favorite.episode.episodeId, newNotes)
              }
              onTagDelete={(episodeId, tagToDelete) =>
                handleTagDelete(episodeId, tagToDelete)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
