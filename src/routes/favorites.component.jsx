import React, { useEffect, useState } from 'react';
import { getFavorites, getEpisodes } from '../firebase/firebase'; // Assuming you have a function to fetch tags and notes

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesData = await getFavorites();
      const episodesData = await getEpisodes(); // Fetch episodes data

      const favoritesWithTagsAndNotes = favoritesData.map((favorite) => {
        const matchingEpisode = episodesData.find(
          (episode) => episode.episode_id === favorite.episodeId
        );

        return {
          ...favorite,
          tags: matchingEpisode && matchingEpisode.episode_tags ? matchingEpisode.episode_tags : [],
          notes: matchingEpisode && matchingEpisode.episode_notes ? matchingEpisode.episode_notes : [],
        };
      });

      setFavorites(favoritesWithTagsAndNotes);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
      {favorites.map((favorite, index) => (
        <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
          <h2 className="font-bold text-2xl">
            Episode {favorite.episodeId}: {favorite.episodeName}
          </h2>
          <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
                    <div>
            Tags: {favorite.tags.join(', ')}
          </div>
          <div>
            Notes: {favorite.notes}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;


