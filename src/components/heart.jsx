// import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

// const Heart = ({ showId, seasonNumber, episodeId, episodeNumber, isHeartClicked, handleHeartClick }) => {
//     return (
//       <div>
//         <div className="rating gap-1">
//           <button
//             className="bg-transparent transition-colors duration-300"
//             onClick={() => handleHeartClick(episodeId)}
//           >
//             {isHeartClicked ? (
//               <RiHeartFill className="h-8 w-8 text-primary" />
//             ) : (
//               <RiHeartLine className="h-8 w-8 text-primary" />
//             )}
//           </button>
//         </div>
//       </div>
//     );
//   };
  
//   export default Heart;

  
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import {getEpisode, addNewEpisode, updateEpisodeField} from '../firebase/firebase';

const Heart = ({ showId, seasonNumber, episodeId, episodeNumber, episodeName, isHeartClicked, handleHeartClick }) => {
  
  const checkAndAddOrUpdateEpisode = async (newHeartState) => {
    const episode = await getEpisode(episodeId); // Assuming you've already implemented the getEpisode function

    if (!episode) {
      // If the episode doesn't exist, add it
      await addNewEpisode(episodeId, episodeName, episodeNumber, [], [], newHeartState);
    } else {
      // If the episode exists, update the is_heart_clicked field
      await updateEpisodeField(episodeId, 'is_heart_clicked', newHeartState);
    }
};


  const handleClick = () => {
    const newHeartState = !isHeartClicked; // Determine the new state
    handleHeartClick(episodeId, newHeartState); // Update the component state
    checkAndAddOrUpdateEpisode(newHeartState); // Update the database
};


  return (
    <div>
      <div className="rating gap-1">
        <button
          className="bg-transparent transition-colors duration-300"
          onClick={handleClick}
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
