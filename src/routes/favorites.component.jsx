import React, { useEffect, useState } from 'react';
import {getFavorites} from '../firebase/firebase';

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavorites(favorites);
      setLoading(false);
    };

    fetchFavorites();
  }, [userUid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
      {favorites.map((favorite, index) => (
        <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
          <h2 className="font-bold text-2xl">
            Episode {favorite.mediaId}: {favorite.mediaName}
          </h2>
          <h1 className="italic">{favorite.mediaRating}/10</h1>
          {/* Add additional favorite information here */}
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
