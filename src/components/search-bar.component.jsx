import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TypingAnimation from "./typing";
import { gsap } from "gsap";

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [focusDelayTimer, setFocusDelayTimer] = useState(null);

  const navigate = useNavigate();

  const HandleButtonClick = (item, type) => {
    navigate(`/${type}-details`, { state: { item } });
  };

  useEffect(() => {
    const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";
    const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&api_key=${apiKey}`;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`;

    const fetchTvShows = fetch(tvUrl).then((res) => res.json());
    const fetchMovies = fetch(movieUrl).then((res) => res.json());

    Promise.all([fetchTvShows, fetchMovies])
      .then(([tvData, movieData]) => {
        const combinedResults = [
          ...tvData.results.map((show) => ({ ...show, type: "tv" })),
          ...movieData.results.map((movie) => ({ ...movie, type: "movie" })),
        ];
        setItems(combinedResults);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [searchTerm]);

  useEffect(() => {
    if (isFocused) {
      // Shrinking animation for the input text when focused
      gsap.fromTo(
        ".shrink-text",
        { fontSize: "11rem" },
        { fontSize: "6rem", duration: 1, ease: "power2.easeIn" }
      );
    } else {
      // Growing animation for the div text when not focused
      gsap.fromTo(
        ".grow-text",
        { fontSize: "6rem" },
        { fontSize: "11rem", duration: 1, ease: "power2.easeOut" }
      );
    }
  }, [isFocused]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDivClick = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    const timer = setTimeout(() => {
      setIsFocused(false);
    }, 125); // 1-second delay before losing focus
    setFocusDelayTimer(timer);
  };

  const handleFocus = () => {
    if (focusDelayTimer) {
      clearTimeout(focusDelayTimer);
      setFocusDelayTimer(null);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        {isFocused ? (
          <input
            type='text'
            placeholder=''
            className='shrink-text text-6xl text-center font-bold max-w-full input input-ghost h-fit focus:outline-none placeholder-primary'
            value={searchTerm}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoFocus
          />
        ) : (
          <div
            className='grow-text text-11xl text-center font-bold text-secondary cursor-pointer'
            onClick={handleDivClick}
          >
            {searchTerm ? (
              searchTerm
            ) : (
              <div>
                <TypingAnimation />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-center w-full container mx-auto'>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className='carousel carousel-center w-1/6 p-2'>
              <button onClick={() => HandleButtonClick(item, item.type)}>
                <div className='relative'>
                  {item.poster_path ? (
                    <img
                      alt={`${
                        item.type === "tv"
                          ? "TV Show Poster for"
                          : "Movie Poster for"
                      } ${item.name || item.title}`}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      className='w-full h-96 object-cover rounded'
                    />
                  ) : (
                    <div className='flex justify-center items-center w-full h-96 bg-base-200 rounded text-2xl text-base-content'>
                      No Poster Image Currently Found
                    </div>
                  )}
                  <div className='absolute bottom-0 w-full p-2 bg-base-300 bg-opacity-70 text-base-content text-sm font-semibold'>
                    {item.name || item.title}
                  </div>
                </div>
              </button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
