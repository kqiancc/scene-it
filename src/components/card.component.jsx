import {Component} from 'react';
import {useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Card = () => {
  // State to store the API response (trending TV shows data)
  const [trendingShows, setTrendingShows] = useState([]);

  const navigate = useNavigate();
   
  const HandleButtonClick = () => {
    // Use the navigate function to navigate to the "/about" route
    navigate('/display-episodes');
  };

  useEffect(() => {
    // Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => setTrendingShows(data.results))
      .catch(err => console.error('Error fetching data:', err));
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    
    // <button className='carousel-item' onClick = {HandleButtonClick}>
  //    <div className="hero min-h-screen bg-base-200">
  // <div className="hero-content flex-col lg:flex-row-reverse">
  //   <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
  //   <div>
  //     <h1 className="text-5xl font-bold">SHOW TITLES APPEAR HERE</h1>
  //     <p className="py-6">RELEASE DATES APPEAR HERE</p>

//     </div>
//   </div>
// </div>


// {/* <div className="carousel carousel-end" onCLick = {HandleButtonClick}>
//       {/* Display trendingShows if available */}
//       {Array.isArray(trendingShows) && trendingShows.length > 0 ? (
//         <div>
//           <h3>Trending TV Shows</h3>
//           <div className="hero-content flex-col lg:flex-row-reverse">
//             {trendingShows.map(show => (
             
//               <div key={show.id} className="show-item">
//                  <button onClick = {HandleButtonClick}>
//                 <img
//                   alt={`TV Show Poster for ${show.name}`}
//                   src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
//                 />
//                 <h1 className="text-5xl font-bold">{show.name}</h1>
//                 <p className = "py-4">First Air Date: {show.first_air_date}</p>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>No trending TV shows found.</p>
//     //   )}
//     // </div> */}


      <div className="carousel carousel-end rounded-box">
        {/* Display trendingShows if available */}
        {Array.isArray(trendingShows) && trendingShows.length > 0 ? (
          trendingShows.map((show) => (
            <div key={show.id} className="carousel-item">
              <button onClick = {HandleButtonClick}>
              <div className="relative">
                <img
                  alt={`TV Show Poster for ${show.name}`}
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  className="w-40 h-56 object-cover rounded"
                />
               
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-sm font-semibold">
                  {show.name}
                  
                </div>
                
              </div>
              </button>
            </div>
          ))
        ) : (
          <p>No trending TV shows found.</p>
        )}
      </div>
  );
};

export default Card;