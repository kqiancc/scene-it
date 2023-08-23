import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const TypingAnimation = () => {
  const [words, setWords] = useState([]);
  //cant set these default words in the words or else its choppy
  const defaultWords = ["Movies", "TV Shows"];

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjJlZmIxZGZhNjEyM2JkZDk1NjliMDk1OWMwZGEyNSIsInN1YiI6IjY0YjVlZDMwMGJiMDc2MDEyZDU5NGMwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ZSXaPPFy5CGFC5CCMz0b4Tbrrgtq9lJU02M2vsL7ck",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const extractedWords = response.results
          .map((item) => `"${item.title || item.name}"`) // Adding double quotes around each word
          .filter((word) => word.length <= 12); // Adjusted the length to account for the quotes
        setWords([...defaultWords, ...extractedWords]); // Append the extracted words to the default ones
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.to(".cursor", {
      opacity: 0,
      ease: "power2.inOut",
      duration: 1,
      repeat: -1,
      yoyo: true,
    });

    let masterTl = gsap.timeline({ repeat: -1, delay: 2.5 }).pause();

    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 2 });
      tl.to(".text", { duration: 1.5, text: word });
      masterTl.add(tl);
    });

    masterTl.play();
  });

  return (
    <div className='flex items-center '>
      <h1 className='relative overflow-hidden font-bold whitespace-nowrap'>
        <span className='inline-block text-primary'>Search</span>&nbsp;
        <span className='text text-secondary'></span>
        <span className='cursor text-primary'>|</span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
