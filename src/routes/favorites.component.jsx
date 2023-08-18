import React, { useEffect, useState } from "react";
import Spinner from "../firebase/spinner";
import Heart from "../components/heart";
import SavedNotes from "../components/elsewhere-notes";
import { toggleEpFav, deleteTagFromEpisode } from "../firebase/firebase";
import { getFavoritedEps } from "../firebase/firebase"; // Adjust the path if necessary

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25"; // Insert your API key

  useEffect(() => {
    fetchFavoritesDetails();
  }, [userUid]);

  const fetchFavoritesDetails = async () => {
    try {
      const showsWithTags = await getFavoritedEps();

      const favoritesDetails = await Promise.all(
        showsWithTags.map(async (favorite) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${favorite.show_id}/season/${favorite.season_number}/episode/${favorite.episode_number}?api_key=${apiKey}&language=en-US`
          );
          const favoriteDetails = await response.json();

          let showName = ""; 

          try {
            const showResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${favorite.show_id}?api_key=${apiKey}&language=en-US`
            );
            const showData = await showResponse.json();
            showName = showData.name; 
          } catch (error) {
            console.error("Error fetching show details:", error);
          }

          return {
            ...favorite,
            episode: {
              ...favoriteDetails,
              tags: favorite.tags || [], 
              notes: favorite.notes || [],
              isHeartClicked: true,
            },
            showName: showName,
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
        if (favorite.episode.episode_id === episodeId) {
          const newHeartState = !favorite.episode.isHeartClicked;  
          toggleEpFav(
            favorite.episode.show_id,
            favorite.episode.season_number,
            favorite.episode.episode_id,
            favorite.episode.episode_name,
            favorite.episode.episode_number,
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
                     {favorite.showName} - Season {favorite.season_number}
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
                   showId={favorite.episode.show_id}
                   seasonNumber={favorite.episode.season_number}
                   episodeId={favorite.episode.episode_id}
                   episodeNumber={favorite.episode.episode_number}
                   episodeName={favorite.episode.episode_name}
                   isHeartClicked={favorite.episode.is_heart_clicked}
                   handleHeartClick={handleHeartClick}
                 />
                 <div className="divider" />
                 <SavedNotes
                   episodeData={favorite}
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
      ))}
    </div>
  );
};

export default FavoritesPage;
