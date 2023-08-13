import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const TypingAnimation = () => {
  const [words, setWords] = useState(["Movies", "TV"]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGMxOTk4OWQ2MWVhOWRhZTFjMDk0OWU3MWFhODVhNSIsInN1YiI6IjY0ZDc0MzFhZDEwMGI2MDBmZjBhYmUzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sgt8MZeI9yC3kHbV4zdlU5TeT7kT3RIyI6LsbHuR2D4",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const extractedWords = response.results
          .map((movie) => `"${movie.original_title}"`) // Adding double quotes around each word
          .filter((word) => word.length <= 12); // Adjusted the length to account for the quotes
        setWords([...words, ...extractedWords]); // Append the extracted words to the default ones
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(words);
  useEffect(() => {
    // Growing animation for the "Search" text (no repeat)
    gsap.fromTo(
      ".grow-text",
      { fontSize: "6rem" },
      { fontSize: "12rem", duration: 1, ease: "power2.easeOut" }
    );

    gsap.to(".cursor", {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });

    let masterTl = gsap.timeline({ repeat: -1, delay: 2.5 }).pause();

    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.25 });
      tl.to(".text", { duration: 1.25, text: word });
      masterTl.add(tl);
    });

    masterTl.play();
  });

  return (
    <div className='flex items-center text-primary'>
      <h1 className='grow-text relative font-bold overflow-hidden whitespace-nowrap'>
        <span className='inline-block'>Search</span>&nbsp;
        {/* Added class for targeting */}
        <span className='text'></span>
        <span className='cursor text-primary'>|</span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
