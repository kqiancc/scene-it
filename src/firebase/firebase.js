//all functions we need to store or push data is in this file

import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJhiyhBdgmCoeRmvoY-oBCDBzc8BOGarw",
  authDomain: "raje-773ec.firebaseapp.com",
  projectId: "raje-773ec",
  storageBucket: "raje-773ec.appspot.com",
  messagingSenderId: "737930556953",
  appId: "1:737930556953:web:c90e5ea10c1a5ee2cedc88",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
let userUid = null;

///////////////////////// CONSTANTS /////////////////////////////////////
const createMovie = (movie_id, movie_name, movie_tags, movie_notes) => {
  return {
    movie_id,
    movie_name,
    movie_tags,
    movie_notes,
  };
};

const createEpisode = (
  episode_id,
  show_name,
  episode_number,
  episode_tags,
  episode_notes,
  is_heart_clicked,
  show_id,
  season_number
) => {
  return {
    episode_id,
    show_name,
    episode_number,
    episode_tags,
    episode_notes,
    is_heart_clicked,
    show_id,
    season_number,
  };
};

const createFavEpisode = (
  showId,
  seasonNumber,
  episodeId,
  showName,
  episodeNumber
) => {
  return {
    showId,
    seasonNumber,
    episodeId,
    showName,
    episodeNumber,
  };
};

const createFavMovie = (movieId, movieName) => {
  return {
    movieId,
    movieName,
  };
};

const INITIAL_DOC = {
  tv_shows: [],
  movies: [],
};

///////////////////////// AUTH /////////////////////////////////////
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(doc(db, "users", user.uid));

    //if document doesnt exist (ie new user), create a document
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        user_data: INITIAL_DOC,
      });
    } else {
      // Existing user, add new movie to the movies array
      const userData = docSnap.data().user_data;

      await updateDoc(docRef, { user_data: userData });
    }
  } catch (err) {
    console.log(err);
  }
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userUid = user.uid;
  } else {
    // User is signed out
    userUid = null;
  }
});

const logout = () => {
  signOut(auth);
};

////////////////////////// FAVORITES ///////////////////////////////////
const toggleEpFav = async (
  //for episodes
  showId,
  seasonNumber,
  episodeId,
  showName,
  episodeNumber,
  isFavorited
) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Check if the episode is already favorited
      const existingFavIndex = userData.favorites.findIndex(
        (fav) => fav.episodeId === episodeId
      );

      if (isFavorited && existingFavIndex === -1) {
        // Add to favorites
        const newFav = createFavEpisode(
          showId,
          seasonNumber,
          episodeId,
          showName,
          episodeNumber
        );
        userData.favorites.push(newFav);
      } else if (!isFavorited && existingFavIndex !== -1) {
        console.log(existingFavIndex);
        // Remove from favorites
      }
      // Update the user's document with the modified user_data
      await updateDoc(docRef, { user_data: userData });
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error toggling fav:", error);
  }
};

const toggleMovieFav = async (
  // For movies
  movieId,
  movieName,
  isFavorited
) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Check if the movie is already favorited
      const existingFavIndex = userData.favorites.findIndex(
        (fav) => fav.movieId === movieId
      );

      if (isFavorited && existingFavIndex === -1) {
        // Add to favorites
        const newFav = createFavMovie(movieId, movieName);
        userData.favorites.push(newFav);
      } else if (!isFavorited && existingFavIndex !== -1) {
        // Remove from favorites
        userData.favorites.splice(existingFavIndex, 1);
      }

      // Update the user's document with the modified user_data
      await updateDoc(docRef, { user_data: userData });
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

const getFavorites = async () => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const favorites = userData.favorites;
      if (favorites) {
        return favorites;
      } else {
        return [];
      }
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

const getFavEpisodes = async () => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const favorites = userData.tv_shows;
      if (favorites) {
        return favorites;
      } else {
        return [];
      }
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

///////////////////////// MOVIES /////////////////////////////////////

const addNewMovie = async (movieId, movieName, movieTags, movieNotes) => {
  try {
    // Retrieve the user's document reference
    const docRef = doc(db, "users", userUid);

    // Get the user's document snapshot
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Create a new movie object
      const newMovie = createMovie(movieId, movieName, movieTags, movieNotes);

      // Add the new movie to the movies array
      userData.movies.push(newMovie);

      // Update the user's document with the modified user_data
      await updateDoc(docRef, { user_data: userData });
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error adding new movie:", error);
  }
};

const getMovie = async (movieId) => {
  try {
    // Retrieve the user's document reference
    const docRef = doc(db, "users", userUid);

    // Get the user's document snapshot
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Find the movie by searching for the movie ID
      const movie = userData.movies.find((movie) => movie.movie_id === movieId);

      if (movie) {
        return movie; // Return the movie if found
      } else {
        return null; // Return null if the movie is not found
      }
    } else {
      console.log("User document not found.");
      return null; // Return null if the user document is not found
    }
  } catch (error) {
    console.error("Error getting movie:", error);
    return null; // Return null if there's an error
  }
};

const updateMovieField = async (movieId, fieldToUpdate, newValue) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const movieIndex = userData.movies.findIndex(
        (movie) => movie.movie_id === movieId
      );

      if (movieIndex !== -1) {
        userData.movies[movieIndex][fieldToUpdate] = newValue;
        await updateDoc(docRef, { user_data: userData });
      } else {
        console.log("Movie not found.");
      }
    } else {
      console.log("User data not found.");
    }
  } catch (error) {
    console.error("Error updating movie field:", error);
  }
};

const deleteTagFromMovie = async (movieId, tagToDelete) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const movieIndex = userData.movies.findIndex(
        (movie) => movie.movie_id === movieId
      );

      if (movieIndex !== -1) {
        // Find the tags array for the specific movie
        const tags = userData.movies[movieIndex].movie_tags;

        // Remove the tag to delete from the tags array
        const updatedTags = tags.filter((tag) => tag !== tagToDelete);

        // Update the tags field with the updatedTags array
        userData.movies[movieIndex].movie_tags = updatedTags;

        // Update the user data in Firebase
        await updateDoc(docRef, { user_data: userData });
      } else {
        console.log("Movie not found.");
      }
    } else {
      console.log("User not found.");
    }
  } catch (error) {
    console.error("Error deleting tag:", error);
  }
};

///////////////////////// EPISODES /////////////////////////////////////

const updateEpisodeField = async (episodeId, fieldToUpdate, newValue) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const episodeIndex = userData.tv_shows.findIndex(
        (episode) => episode.episode_id === episodeId
      );

      if (episodeIndex !== -1) {
        userData.tv_shows[episodeIndex][fieldToUpdate] = newValue;
        await updateDoc(docRef, { user_data: userData });
      } else {
        console.log("Episode not found.");
      }
    } else {
      console.log("Show not found.");
    }
  } catch (error) {
    console.error("Error updating episode field:", error);
  }
};

const deleteTagFromEpisode = async (episodeId, tagToDelete) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const episodeIndex = userData.tv_shows.findIndex(
        (episode) => episode.episode_id === episodeId
      );

      if (episodeIndex !== -1) {
        // Find the tags array for the specific episode
        const tags = userData.tv_shows[episodeIndex].episode_tags;

        // Remove the tag to delete from the tags array
        const updatedTags = tags.filter((tag) => tag !== tagToDelete);

        // Update the tags field with the updatedTags array
        userData.tv_shows[episodeIndex].episode_tags = updatedTags;

        // Update the user data in Firebase
        await updateDoc(docRef, { user_data: userData });
      } else {
        console.log("Episode not found.");
      }
    } else {
      console.log("User not found.");
    }
  } catch (error) {
    console.error("Error deleting tag:", error);
  }
};

const addNewEpisode = async (
  episodeId,
  showName,
  episodeNumber,
  episodeTags,
  episodeNotes,
  isHeartClicked,
  showId,
  seasonNumber
) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const newEpisode = createEpisode(
        episodeId,
        showName,
        episodeNumber,
        episodeTags,
        episodeNotes,
        isHeartClicked,
        showId,
        seasonNumber
      );

      userData.tv_shows.push(newEpisode);

      await updateDoc(docRef, { user_data: userData });
    } else {
      console.log("Show not found.");
    }
  } catch (error) {
    console.error("Error adding new episode:", error);
  }
};

const getEpisode = async (episodeId) => {
  try {
    // Retrieve the user's document reference
    const docRef = doc(db, "users", userUid);

    // Get the user's document snapshot
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Find the movie by searching for the movie ID
      const episode = userData.tv_shows.find(
        (episode) => episode.episode_id === episodeId
      );

      if (episode) {
        return episode; // Return the movie if found
      } else {
        return null; // Return null if the movie is not found
      }
    } else {
      console.log("User document not found.");
      return null; // Return null if the user document is not found
    }
  } catch (error) {
    console.error("Error getting episode:", error);
    return null; // Return null if there's an error
  }
};

//////////////////////////SAVED//////////////////////////////////

const getTVShowsWithTags = async () => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const tvShows = userData.tv_shows || [];

      const tvShowsWithTags = tvShows.filter((episode) => {
        return episode.episode_tags && episode.episode_tags.length > 0;
      });

      if (tvShowsWithTags.length > 0) {
        return tvShowsWithTags;
      } else {
        return [];
      }
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting TV Shows with episode tags:", error);
    return [];
  }
};

const getFavoritedEps = async () => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const tvShows = userData.tv_shows || [];

      const favoritedEp = tvShows.filter((episode) => episode.is_heart_clicked);

      if (favoritedEp.length > 0) {
        return favoritedEp;
      } else {
        return [];
      }
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting favorited TV Shows:", error);
    return [];
  }
};

const getAllTags = async (userUid) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const allTags = [];

      userData.tv_shows.forEach((episode) => {
        if (episode.episode_tags) {
          episode.episode_tags.forEach((tag) => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        }
      });

      return allTags;
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting all tags:", error);
    return [];
  }
};

const getFavTags = async (userUid) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const favTags = [];

      userData.tv_shows.forEach((episode) => {
        if (episode.is_heart_clicked && episode.episode_tags) {
          episode.episode_tags.forEach((tag) => {
            if (!favTags.includes(tag)) {
              favTags.push(tag);
            }
          });
        }
      });

      return favTags;
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting all tags:", error);
    return [];
  }
};

const getEpisodeTags = async (userUid) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const tvShows = userData.tv_shows || [];

      // Extract episode tags from each TV show and flatten the result into a single array
      const allTags = tvShows.flatMap((episode) => episode.episode_tags || []);

      // To get unique tags, convert the array into a Set and back into an array
      const uniqueTags = [...new Set(allTags)];

      return uniqueTags;
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting episode tags:", error);
    return [];
  }
};

export default getEpisodeTags;

export {
  //authentification
  signInWithGoogle,
  logout,
  db,
  auth,
  //movies
  getMovie,
  addNewMovie,
  updateMovieField,
  deleteTagFromMovie,
  //episodes
  updateEpisodeField,
  deleteTagFromEpisode,
  addNewEpisode,
  getEpisode,
  //favorites
  toggleEpFav,
  getFavEpisodes,
  getFavorites,
  toggleMovieFav,
  getFavTags,
  //saved
  getTVShowsWithTags,
  getFavoritedEps,
  getAllTags,
  getEpisodeTags,
};
