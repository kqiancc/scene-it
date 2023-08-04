import React, { useState, useEffect } from 'react';
import Filters from '../components/filters.component';
import Card from '../components/card.component';
import MovieCard from '../components/movies-card.component';

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [selectedId, setFisetSelectedId] = useState(null);
  const apiKey = '1b2efb1dfa6123bdd9569b0959c0da2';

  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`)
  //     .then((response) => response.json())
  //     .then((users) => setMonsters(users));
  // }, []);

  // // useEffect(() => {
  // //   const newFilteredMonsters = monsters.filter((monster) => {
  // //     return monster.name.toLocaleLowerCase().includes(searchField);
  // //   });

  //   setFilterMonsters(newFilteredMonsters);
  // }, [monsters, searchField]);

  // const onSearchChange = (event) => {
  //   const searchFieldString = event.target.value.toLocaleLowerCase();
  //   setSearchField(searchFieldString);
  // };

  return (
    <div className='App'>
    <h1 className="text-5xl font-bold text-center padding">search shows</h1>
   
   <div className = "carousel carousel-beginning rounded-box">
     <div className = "carousel-item">
     <Card className = "rounded-box"/>
     </div>
     <div className = "carousel-item">
     <MovieCard className = "rounded-box"/>
     </div>
     </div>
 </div> 
  );
};

export default Home;


// import React, { useState, useEffect } from 'react';

// import SearchBox from '../components/search-bar.component';

// const App = () => {
//   const [searchField, setSearchField] = useState('');
//   const [tvShows, setTvShows] = useState([]);
//   const [filteredTvShows, setFilteredTvShows] = useState([]);

//   const apiKey = '1b2efb1dfa6123bdd9569b0959c0da2';

//   useEffect(() => {
//     // Function to fetch TV show data
//     const fetchTvShows = async () => {
//       try {
//         const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTvShows(data.results);
//       } catch (error) {
//         console.error('Error fetching TV show data:', error);
//       }
//     };

//     // Call the function to fetch data when the component mounts
//     fetchTvShows();
//   }, [apiKey]);

//   useEffect(() => {
//     // Filter TV shows based on searchField
//     const newFilteredTvShows = tvShows.filter((tvShow) => {
//       return tvShow.name.toLowerCase().includes(searchField.toLowerCase());
//     });

//     setFilteredTvShows(newFilteredTvShows);
//   }, [tvShows, searchField]);

//   const onSearchChange = (event) => {
//     const searchFieldString = event.target.value.toLowerCase();
//     setSearchField(searchFieldString);
//   };

//   return (
//     <div className='App'>
//       {/* Your component's content goes here */}
//       <h1 className='app-title'>TV Shows Rolodex</h1>

//       <SearchBox
//         className='tv-shows-search-box'
//         onChangeHandler={onSearchChange}
//         placeholder='Search TV Shows'
//       />
//       <Card tvShows={filteredTvShows} />
//     </div>
//   );
// };

// export default App;





// import React, { useState, useEffect } from 'react';

// const YourComponent = () => {
//   const [tvShows, setTvShows] = useState([]); // Change the state variable name
//   const [filteredTvShows, setFilteredTvShows] = useState([]); // Change the state variable name
//   const [searchField, setSearchField] = useState('');

//   const apiKey = '1b2efb1dfa6123bdd9569b0959c0da2';

//   useEffect(() => {
//     // Function to fetch TV show data
//     const fetchTvShows = async () => {
//       try {
//         const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTvShows(data.results); // Update the state variable name
//       } catch (error) {
//         console.error('Error fetching TV show data:', error);
//       }
//     };

//     // Call the function to fetch data when the component mounts
//     fetchTvShows();
//   }, [apiKey]);

//   useEffect(() => {
//     // Filter TV shows based on searchField
//     const newFilteredTvShows = tvShows.filter((tvShow) => {
//       return tvShow.name.toLowerCase().includes(searchField.toLowerCase()); // Use tvShow.name instead of monster.name
//     });

//     setFilteredTvShows(newFilteredTvShows); // Update the state variable name
//   }, [tvShows, searchField]);

//   const onSearchChange = (event) => {
//     const searchFieldString = event.target.value.toLowerCase(); // Use toLowerCase() for searchField
//     setSearchField(searchFieldString);
//   };

//   return (
//     <div>
//       <div className='App'>
//      <h1 className="text-5xl font-bold text-center">saved shows</h1>
//        <div className = "carousel carousel-end rounded-box">
//          <div className = "carousel-item">
//          <Card className = "rounded-box"/>
//          </div>
//          </div>
//      </div>
//       <input
//         type="text"
//         placeholder="Search TV Shows..."
//         onChange={onSearchChange}
//       />
//       <div className="show-item">
//         {/* Use filteredTvShows instead of monsters */}
//         {filteredTvShows.map((tvShow) => (
//           <div key={tvShow.id} className="show-item">
//             <img
//               alt={`TV Show Poster for ${tvShow.name}`}
//               src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
//             />
//             <h1 className="text-5xl font-bold">{tvShow.name}</h1>
//             <p className="py-4">First Air Date: {tvShow.first_air_date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default YourComponent;


// import { useEffect, useRef, useState } from "react";
// import StarRating from "./StarRating";
// import { useKey } from "./useKey";
// import { useLocalStorageState } from "./useLocalStorageState";
// import { useMovies } from "./useMovies";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const KEY = "f84fc31d";

// const Home = () => {
//   const [query, setQuery] = useState("");
//   const [selectedId, setSelectedId] = useState(null);
//   const { movies, isLoading, error } = useMovies(query);

//   const [watched, setWatched] = useLocalStorageState([], "watched");

//   function handleSelectMovie(id) {
//     setSelectedId((selectedId) => (id === selectedId ? null : id));
//   }

//   function handleCloseMovie() {
//     setSelectedId(null);
//   }

//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//   }

//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   return (
//     <>
//       <NavBar>
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </NavBar>

//       <Main>
//         <Box>
//           {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>

//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onCloseMovie={handleCloseMovie}
//               onAddWatched={handleAddWatched}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMoviesList
//                 watched={watched}
//                 onDeleteWatched={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }

// function Loader() {
//   return <p className="loader">Loading...</p>;
// }

// function ErrorMessage({ message }) {
//   return (
//     <p className="error">
//       <span>⛔️</span> {message}
//     </p>
//   );
// }

// function NavBar({ children }) {
//   return (
//     <nav className="nav-bar">
//       <Logo />
//       {children}
//     </nav>
//   );
// }

// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }

// function Search({ query, setQuery }) {
//   const inputEl = useRef(null);

//   useKey("Enter", function () {
//     if (document.activeElement === inputEl.current) return;
//     inputEl.current.focus();
//     setQuery("");
//   });

//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       ref={inputEl}
//     />
//   );
// }

// function NumResults({ movies }) {
//   return (
//     <p className="num-results">
//       Found <strong>{movies.length}</strong> results
//     </p>
//   );
// }

// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>

//       {isOpen && children}
//     </div>
//   );
// }

// /*
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>

//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
// */

// function MovieList({ movies, onSelectMovie }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie) => (
//         <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
//       ))}
//     </ul>
//   );
// }

// function Movie({ movie, onSelectMovie }) {
//   return (
//     <li onClick={() => onSelectMovie(movie.imdbID)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }

// function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const countRef = useRef(0);

//   useEffect(
//     function () {
//       if (userRating) countRef.current++;
//     },
//     [userRating]
//   );

//   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId
//   )?.userRating;

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   // if (imdbRating > 8) return <p>Greatest ever!</p>;
//   // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

//   // const [isTop, setIsTop] = useState(imdbRating > 8);
//   // console.log(isTop);
//   // useEffect(
//   //   function () {
//   //     setIsTop(imdbRating > 8);
//   //   },
//   //   [imdbRating]
//   // );

//   const isTop = imdbRating > 8;
//   console.log(isTop);

//   // const [avgRating, setAvgRating] = useState(0);

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(" ").at(0)),
//       userRating,
//       countRatingDecisions: countRef.current,
//     };

//     onAddWatched(newWatchedMovie);
//     onCloseMovie();

//     // setAvgRating(Number(imdbRating));
//     // setAvgRating((avgRating) => (avgRating + userRating) / 2);
//   }

//   useKey("Escape", onCloseMovie);

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = "usePopcorn";
//         // console.log(`Clean up effect for movie ${title}`);
//       };
//     },
//     [title]
//   );

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${movie} movie`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐️</span>
//                 {imdbRating} IMDb rating
//               </p>
//             </div>
//           </header>

//           {/* <p>{avgRating}</p> */}

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You rated with movie {watchedUserRating} <span>⭐️</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));

//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// function WatchedMoviesList({ watched, onDeleteWatched }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <WatchedMovie
//           movie={movie}
//           key={movie.imdbID}
//           onDeleteWatched={onDeleteWatched}
//         />
//       ))}
//     </ul>
//   );
// }

// function WatchedMovie({ movie, onDeleteWatched }) {
//   return (
//     <li>
//       <img src={movie.poster} alt={`${movie.title} poster`} />
//       <h3>{movie.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>

//         <button
//           className="btn-delete"
//           onClick={() => onDeleteWatched(movie.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>

//   );
// }

// export default Home; 