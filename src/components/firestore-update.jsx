import {updateUserMovieField} from "../firebase/firebase";

const FirestoreUpdate = ({label}) => {

    const handleUpdateClick = (movieNameToUpdate, fieldToUpdate, newValue) => {
        updateUserMovieField(movieNameToUpdate, fieldToUpdate, newValue);
    };
    
	return (
        <button 
            className="btn" 
            onClick={() => handleUpdateClick(100,"movie_rating", 9)}
            >
        {label}
        </button>
	);
};

export default FirestoreUpdate;