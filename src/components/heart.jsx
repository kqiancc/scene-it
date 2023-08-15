import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const Heart = ({ showId, seasonNumber, episodeId, episodeNumber, isHeartClicked, handleHeartClick }) => {
    return (
      <div>
        <div className="rating gap-1">
          <button
            className="bg-transparent transition-colors duration-300"
            onClick={() => handleHeartClick(episodeId)}
          >
            {isHeartClicked ? (
              <RiHeartFill className="h-8 w-8 text-primary" />
            ) : (
              <RiHeartLine className="h-8 w-8 text-primary" />
            )}
          </button>
        </div>
      </div>
    );
  };
  
  export default Heart;

  
