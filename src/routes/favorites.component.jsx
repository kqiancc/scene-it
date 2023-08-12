import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Favorites = () => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div>
      <div className="rating gap-1">
        <button
          className="bg-transparent transition-colors duration-300"
          onClick={handleHeartClick}
        >
          {isHeartClicked ? (
            <AiFillHeart className="h-8 w-8 text-primary" />
          ) : (
            <AiOutlineHeart className="h-8 w-8 text-primary" />
          )}
        </button>
      </div>
      <div>
        {isHeartClicked ? (
          <p>The heart was clicked!</p>
        ) : (
          <p>The heart hasn't been clicked yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
