import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TypingAnimation from "./typing";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const HandleButtonClick = (item, type) => {
    navigate(`/${type}-details`, { state: { item } });
  };

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
  }, [isFocused, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDivClick = () => {
    setIsFocused(true);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        {isFocused ? (
          <input
            type='text'
            placeholder=''
            className='shrink-text text-6xl text-center font-bold text-primary max-w-full input input-ghost h-fit focus:outline-none placeholder-primary'
            value={searchTerm}
            onChange={handleInputChange}
            onBlur={() => setIsFocused(false)}
            autoFocus
          />
        ) : (
          <div
            className='grow-text text-11xl text-center font-bold text-primary cursor-pointer'
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
                    <div className='flex justify-center items-center w-full h-96 bg-base-100 rounded text-2xl text-base-content'>
                      No Poster Image Currently Found
                    </div>
                  )}
                  <div className='absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-sm font-semibold'>
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
