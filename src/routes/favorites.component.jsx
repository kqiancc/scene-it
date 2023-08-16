import React, { useEffect, useState } from 'react';
import { getFavorites, getFavEpisodes } from '../firebase/firebase';
import Spinner from '../firebase/spinner';
import ElsewhereNotes from "../components/elsewhere-notes";
import Heart from "../components/heart";
import {toggleEpFav, deleteTagFromEpisode, getEpisode} from "../firebase/firebase";

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritesAndEpisodes = async () => {
      const favoritesData = await getFavorites();
      const episodesData = await getFavEpisodes();
      const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
     
      const favoritesWithDetails = await Promise.all(
        favoritesData.map(async (favorite) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${favorite.showId}/season/${favorite.seasonNumber}/episode/${favorite.episodeNumber}?api_key=${apiKey}&language=en-US`
          );
          const episodeDetails = await response.json();

          const matchingEpisode = episodesData.find(
            (episode) => episode.episode_id === favorite.episodeId
          );

          let showName = ''; // Initialize the showName variable

          try {
            const showResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${favorite.showId}?api_key=${apiKey}&language=en-US`
            );
            const showData = await showResponse.json();
            showName = showData.name; // Get the show name from the API response
          } catch (error) {
            console.error('Error fetching show details:', error);
          }



          return {
            ...favorite,
            episode: episodeDetails,
            showName: showName,
            tags: matchingEpisode && matchingEpisode.episode_tags ? matchingEpisode.episode_tags : [],
            notes: matchingEpisode && matchingEpisode.episode_notes ? matchingEpisode.episode_notes : [],
          };
        })
      );

      setFavorites(favoritesWithDetails);
      setLoading(false);
    };

    fetchFavoritesAndEpisodes();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  
  const handleTagsChange = (episodeId, newTags) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.id === episodeId ? { ...favorite, episode: { ...favorite.episode, tags: newTags }} : favorite
      )
    );
  };
  
  const handleTagDelete = (episodeId, tagToDelete) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.episodeId === episodeId
          ? { ...favorite, tags: favorite.episode.tags.filter((tag) => tag !== tagToDelete) }
          : favorite
      )
    );
  
    deleteTagFromEpisode(episodeId, tagToDelete);
  };
  
  const handleNotesChange = (episodeId, newNotes) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) =>
        favorite.episode.id === episodeId ? { ...favorite, episode: { ...favorite.episode, notes: newNotes }} : favorite
        
        )
        
    );
    
  };
  
  const handleHeartClick = (episodeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) => {
        if (favorite.episode.id === episodeId) {
          const newHeartState = !favorite.episode.isHeartClicked;
          toggleEpFav(
            favorite.showId,
            favorite.seasonNumber,
            favorite.episode.id,
            favorite.episode.name,
            favorite.episode.episode_number,
            newHeartState
          );
          return { ...favorite, episode: { ...favorite.episode, isHeartClicked: newHeartState }};
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
          <input type="checkbox" name="my-accordion-3 flex flex-row items-center"/>
          <div className="text-xl collapse-title">
            <figure className="float-left">
              {favorite.episode.still_path ? (
                <img className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${favorite.episode.still_path}`}
                  alt={`Episode ${favorite.episode.episode_number} - ${favorite.episode.name}`}
                  style={{ width: "300px", height: "auto" }}
                />
              ) : (
                <div style={{ width: "300px", height: "175px" }} className="flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content">
                  No Poster Image Currently Found
                </div>
              )}
            </figure>
            <div className="select-text card-body">
            <h3 className="text-3xl font-bold"> 
                {favorite.showName} - Season {favorite.seasonNumber}
            </h3>
              <h2 className="text-2xl font-bold">
                Episode {favorite.episode.episode_number}: {favorite.episode.name}
              </h2>
              <h1 className="italic">
                {favorite.episode.vote_average}/10 - {favorite.episode.runtime} minutes
              </h1>
              <h1 className="italic">Aired: {favorite.episode.air_date} </h1>
              <p>{favorite.episode.overview}</p>
              <div className="justify-end card-actions"></div>
              </div>
              </div>
              {/*TESTING NEW STUFF */}
              <div className="collapse-content">
              
              <Heart
              showId = {favorite.episode.showId}
              seasonNumber = {favorite.episode. seasonNumber} 
              episodeId={favorite.episode.episodeId}
              episodeNumber= {favorite.episode.episodeNumber}
              episodeName = {favorite.episode.episodeName}
              isHeartClicked={favorite.episode.is_heart_clicked}
              handleHeartClick={handleHeartClick}
            />
            <div className="divider" />
            <ElsewhereNotes
              episodeData={favorite}
              onTagsChange={(newTags) => handleTagsChange(favorite.episode.episodeId, newTags)}
              onNotesChange={(newNotes) =>
                handleNotesChange(favorite.episode.episodeId, newNotes)}
              onTagDelete={(episodeId, tagToDelete) => handleTagDelete(episodeId, tagToDelete)} 
            />
            </div>
           
          </div>
        
        
      ))}
    </div>
  );



};

export default FavoritesPage;
