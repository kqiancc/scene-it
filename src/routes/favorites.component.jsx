import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const docRef = doc(db, "users", userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data().user_data;
          const favorites = userData.favorites;
          if (favorites) {
            console.log("Favorites found");
            return favorites;
          } else {
            console.log("No favorites found.");
            return [];
          }
        } else {
          console.log("User document not found.");
          return [];
        }
      } catch (error) {
        console.error("Error getting favorites:", error);
        return [];
      }
    };

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
