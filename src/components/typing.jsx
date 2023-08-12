import React, { useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const TypingAnimation = () => {
  useEffect(() => {
    const words = ["Movies", "Shows", '"Barbie"', '"Oppenheimer"'].filter(
      (word) => word.length <= 10
    );

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
  }, []);

  return (
    <div className='flex items-center text-primary'>
      <h1 className='grow-text relative font-bold overflow-hidden whitespace-nowrap'>
        <span className='inline-block'>Search</span>&nbsp;{" "}
        {/* Added class for targeting */}
        <span className='text'></span>
        <span className='cursor text-primary'>|</span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
