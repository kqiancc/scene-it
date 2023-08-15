// import React, { useEffect, useState } from 'react';
// import {getFavorites} from '../firebase/firebase';

// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
    
//     const fetchFavorites = async () => {
//       const favorites = await getFavorites();
//       setFavorites(favorites);
//       setLoading(false);
//     };

//     fetchFavorites();
//   }, [userUid]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
//       {favorites.map((favorite, index) => (
//         <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
//           <h2 className="font-bold text-2xl">
//             Episode {favorite.mediaId}: {favorite.mediaName}
//           </h2>
//           <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
//           <h1 className="italic">{favorite.mediaRating}/10</h1>
//           {/* Add additional favorite information here */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;


// import React, { useEffect, useState } from 'react';
// import { getFavorites, getEpisodes } from '../firebase/firebase'; // Assuming you have a function to fetch tags and notes

// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const favoritesData = await getFavorites();
//       const episodesData  = await getEpisodes(); // Fetch tags and notes

//       const favoritesWithTagsAndNotes = favoritesData.map((favorite) => {
//         const matchingTagsAndNotes = episodesData.find(
//           (episode) => episode.episodeId === favorite.mediaId
//         );
        
//         return {
//           ...favorite,
//           tags: matchingTagsAndNotes ? matchingTagsAndNotes.tags : [],
//           notes: matchingTagsAndNotes ? matchingTagsAndNotes.notes : [],
//         };
//       });

//       setFavorites(favoritesWithTagsAndNotes);
//       setLoading(false);
//     };

//     fetchFavorites();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
//       {favorites.map((favorite, index) => (
//         <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
//           <h2 className="font-bold text-2xl">
//             Episode {favorite.mediaId}: {favorite.mediaName}
//           </h2>
//           <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
//           <h1 className="italic">{favorite.mediaRating}/10</h1>
//           <div>
//             Tags: {favorite.episode_tags.join(', ')}
//           </div>
//           <div>
//             Notes: {favorite.episode_notes.join(', ')}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;

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
          (episode) => episode.episodeId === favorite.mediaId
        );
        
        return {
          ...favorite,
          tags: matchingEpisode && matchingEpisode.tags ? matchingEpisode.tags : [],
          notes: matchingEpisode && matchingEpisode.notes ? matchingEpisode.notes : [],
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
            Notes: {favorite.notes.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;





// import React, { useState, useEffect } from "react";

// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const favorites = await getFavorites();
//       setFavorites(favorites);
//       setLoading(false);
//     };

//     fetchFavorites();
//   }, [userUid]);

//   const getEpisodeInfo = async (showId, seasonNumber, mediaId) => {
//     const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25"; // Replace with your actual API key
//     const response = await fetch(
//       `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${mediaId}?api_key=${apiKey}&language=en-US`
//     );
//     const episodeInfo = await response.json();
//     return episodeInfo;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
//       {favorites.map((favorite, index) => (
//         <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
//           <h2 className="font-bold text-2xl">
//             Episode {favorite.mediaId}: {favorite.mediaName}
//           </h2>
//           <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
//           <h1 className="italic">{favorite.mediaRating}/10</h1>
//           <button
//             onClick={async () => {
//               const episodeInfo = await getEpisodeInfo(
//                 favorite.showId,
//                 favorite.seasonNumber,
//                 favorite.mediaId
//               );
//               console.log(episodeInfo); // Do something with episodeInfo
//             }}
//           >
//             Load Episode Info
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;


// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const favorites = await getFavorites();
//       setFavorites(favorites);
//       setLoading(false);
//     };

//     fetchFavorites();
//   }, [userUid]);

//   const getFavorites = async (showId, seasonNumber, mediaId) => {
//     const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25"; // Replace with your actual API key
//     const response = await fetch(
//       `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${mediaId}?api_key=${apiKey}&language=en-US`
//     );
//     const episodeInfo = await response.json();
//     return episodeInfo;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="font-bold text-5xl text-center p-5">Favorites</h1>
//       {favorites.map((favorite, index) => (
//         <div key={index} className="bg-base-200 w-9/12 p-5 mb-4">
//           <h2 className="font-bold text-2xl">
//             Episode {favorite.mediaId}: {favorite.mediaName}
//           </h2>
//           <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
//           <h1 className="italic">{favorite.mediaRating}/10</h1>
//           <button
//             onClick={async () => {
//               const episodeInfo = await getEpisodeInfo(
//                 favorite.showId,
//                 favorite.seasonNumber,
//                 favorite.mediaId
//               );

//               // Toggle visibility of episode information
//               const accordion = document.getElementById(`accordion-${index}`);
//               if (accordion) {
//                 accordion.classList.toggle("active");
//               }
//             }}
//           >
//             Load Episode Info
//           </button>
//           <div
//             id={`accordion-${index}`}
//             className="collapse-title text-xl collapse accordion active"
//           >
//             {/* Display episode information here */}
//             {/* Modify the content below based on your styling */}
//             <figure className="float-left">
//               {episodeInfo.still_path ? (
//                 <img
//                   className="rounded-lg"
//                   src={`https://image.tmdb.org/t/p/w500${episodeInfo.still_path}`}
//                   alt={`Episode ${episodeInfo.episode_number} - ${episodeInfo.name}`}
//                   style={{ width: "300px", height: "auto" }}
//                 />
//               ) : (
//                 <div
//                   style={{ width: "300px", height: "175px" }}
//                   className="flex justify-center items-center w-full h-96 bg-base-100 rounded text-2xl text-base-content text-center"
//                 >
//                   No Poster Image Currently Found
//                 </div>
//               )}
//             </figure>
//             <div className="card-body select-text">
//               <h2 className="font-bold text-2xl">
//                 Episode {episodeInfo.episode_number}: {episodeInfo.name}
//               </h2>
//               <h1 className="italic">
//                 {episodeInfo.vote_average}/10 - {episodeInfo.runtime} minutes
//               </h1>
//               <h1 className="italic">Aired: {episodeInfo.air_date} </h1>
//               <p>{episodeInfo.overview}</p>
//               <div className="card-actions justify-end"></div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;
