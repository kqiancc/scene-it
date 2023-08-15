// import React, { useEffect, useState } from 'react';
// import { getFavorites, getEpisodes } from '../firebase/firebase'; // Assuming you have a function to fetch tags and notes
// import Notes from '../components/notes.component';
// import Heart from "../components/heart";
// import {toggleEpFav, deleteTagFromEpisode,} from "../firebase/firebase";

// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [episodes, setEpisodes] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const favoritesData = await getFavorites();
//       const episodesData = await getEpisodes(); // Fetch episodes data

//       const favoritesWithTagsAndNotes = favoritesData.map((favorite) => {
//         const matchingEpisode = episodesData.find(
//           (episode) => episode.episode_id === favorite.episodeId
//         );

//         return {
//           ...favorite,
//           tags: matchingEpisode && matchingEpisode.episode_tags ? matchingEpisode.episode_tags : [],
//           notes: matchingEpisode && matchingEpisode.episode_notes ? matchingEpisode.episode_notes : [],
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
//             Episode {favorite.episodeId}: {favorite.episodeName}
//           </h2>
//           <h1>{favorite.showId} : {favorite.seasonNumber}</h1>
//                     <div>
//             Tags: {favorite.tags.join(', ')}
//           </div>
//           <div>
//             Notes: {favorite.notes}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;

// import React, { useEffect, useState } from 'react';
// import { getFavorites } from '../firebase/firebase';

// const FavoritesPage = ({ userUid }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const fetchFavoritesAndEpisodes = async () => {
//       const favoritesData = await getFavorites();

//       // Fetch episodes details for each favorite
//       const favoritesWithDetails = await Promise.all(
//         favoritesData.map(async (favorite) => {
//           const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25'
//           console.log(favorite.showId)
//           console.log(favorite.seasonNumber)
//           console.log(favorite.episodeId)
//           const response = await fetch(
//             `https://api.themoviedb.org/3/tv/${favorite.showId}/season/${favorite.seasonNumber}/episode/${favorite.episodeNumber}?api_key=${apiKey}&language=en-US`
//           );
          
//           const episodeDetails = await response.json();
//           console.log(response)
//           return {
//             ...favorite,
//             episode: episodeDetails,
//           };
//         })
//       );

//       setFavorites(favoritesWithDetails);
//       setLoading(false);
//     };

//     fetchFavoritesAndEpisodes();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="font-bold text-5xl text-center p-5 h-28">Favorites</h1>
//       {favorites.map((favorite, index) => (
//         <div key={index} className="collapse collapse-plus bg-base-200 w-9/12 ">
//           <input type="checkbox" name="my-accordion-3 flex flex-row items-center" />
//           <div className="collapse-title text-xl">
//             <figure className="float-left">
//               {favorite.episode.still_path ? (
//                 <img className="rounded-lg"
//                   src={`https://image.tmdb.org/t/p/w500${favorite.episode.still_path}`}
//                   alt={`Episode ${favorite.episode.episode_number} - ${favorite.episode.name}`}
//                   style={{ width: "300px", height: "auto" }}
//                 />
//               ) : (
//                 <div style={{ width: "300px", height: "175px" }} className="flex justify-center items-center w-full h-96 bg-base-100 rounded text-2xl text-base-content text-center">
//                   No Poster Image Currently Found
//                 </div>
//               )}
//             </figure>
//             <div className="card-body select-text">
//               <h2 className="font-bold text-2xl">
//                 Episode {favorite.episode.episode_number}: {favorite.episode.name}
//               </h2>
//               <h1 className="italic">
//                 {favorite.episode.vote_average}/10 - {favorite.episode.runtime} minutes
//               </h1>
//               <h1 className="italic">Aired: {favorite.episode.air_date} </h1>
//               <p>{favorite.episode.overview}</p>
//               <div className="card-actions justify-end"></div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;


import React, { useEffect, useState } from 'react';
import { getFavorites, getEpisodes } from '../firebase/firebase';

const FavoritesPage = ({ userUid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesAndEpisodes = async () => {
      const favoritesData = await getFavorites();
      const episodesData = await getEpisodes();
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

          return {
            ...favorite,
            episode: episodeDetails,
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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center p-5 h-28">Favorites</h1>
      {favorites.map((favorite, index) => (
        <div key={index} className="collapse collapse-plus bg-base-200 w-9/12 ">
          <input type="checkbox" name="my-accordion-3 flex flex-row items-center"/>
          <div className="collapse-title text-xl">
            <figure className="float-left">
              {favorite.episode.still_path ? (
                <img className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${favorite.episode.still_path}`}
                  alt={`Episode ${favorite.episode.episode_number} - ${favorite.episode.name}`}
                  style={{ width: "300px", height: "auto" }}
                />
              ) : (
                <div style={{ width: "300px", height: "175px" }} className="flex justify-center items-center w-full h-96 bg-base-100 rounded text-2xl text-base-content text-center">
                  No Poster Image Currently Found
                </div>
              )}
            </figure>
            <div className="card-body select-text">
              <h2 className="font-bold text-2xl">
                S{favorite.seasonNumber} - Episode {favorite.episode.episode_number}: {favorite.episode.name}
              </h2>
              <h1 className="italic">
                {favorite.episode.vote_average}/10 - {favorite.episode.runtime} minutes
              </h1>
              <h1 className="italic">Aired: {favorite.episode.air_date} </h1>
              <p>{favorite.episode.overview}</p>
              <div className="card-actions justify-end"></div>
              </div>
              </div>
              <div className="collapse-content">
              <div>
                Tags: {favorite.tags}
              </div>
              <div>
                Notes: {favorite.notes}
              </div>
            </div>
           
          </div>
        
        
      ))}
    </div>
  );
};

export default FavoritesPage;
