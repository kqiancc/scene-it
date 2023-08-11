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
const createMovie = (
  movie_id,
  movie_name,
  movie_rating,
  movie_tags,
  movie_notes
) => {
  return {
    movie_id,
    movie_name,
    movie_rating,
    movie_tags,
    movie_notes,
  };
};

const createEpisode = (
  episode_id,
  episode_name,
  episode_rating,
  episode_tags,
  episode_notes
) => {
  return {
    episode_id,
    episode_name,
    episode_rating,
    episode_tags,
    episode_notes,
  };
};

const createSeason = (seasonNumber, season_episodes) => {
  return {
    season_number: seasonNumber,
    season_episodes,
  };
};

const createTVShow = (tv_id, tv_name, tv_seasons) => {
  return {
    tv_id,
    tv_name,
    tv_seasons,
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
      // const newMovie = createMovie(
      //   "13903",
      //   "Movie Name",
      //   "4.0",
      //   ["Action", "Romance"],
      //   ["Exciting new film!", "A do not watch!"]
      // );
      // userData.movies.push(newMovie);

      // // Add a new episode
      // const newEpisode = createEpisode(
      //   "episodeId123",
      //   "Episode Title",
      //   "3.5",
      //   ["Drama", "Mystery"],
      //   ["Interesting episode!", "A must-watch!"]
      // );
      // userData.episodes.push(newEpisode);

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
    console.log("User UID:", userUid);
  } else {
    // User is signed out
    userUid = null;
    console.log("No user is currently signed in.");
  }
});

const logout = () => {
  signOut(auth);
};

///////////////////////// MOVIES /////////////////////////////////////
const updateUserMovieField = async (movieId, fieldToUpdate, newValue) => {
  try {
    // Retrieve the user's document reference
    const docRef = doc(db, "users", userUid);

    // Get the user's document snapshot
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Find the movie index by searching for the movie name
      const movieIndex = userData.movies.findIndex(
        (movie) => movie.movie_id === movieId
      );

      if (movieIndex !== -1) {
        // Update the specific field with the new value
        userData.movies[movieIndex][fieldToUpdate] = newValue;

        // Update the user's document with the modified user_data
        await updateDoc(docRef, { user_data: userData });
        console.log("Movie field updated successfully.");
      } else {
        console.log("Movie not found.");
      }
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error updating movie field:", error);
  }
};

const addNewMovie = async (
  movieId,
  movieName,
  movieRating,
  movieTags,
  movieNotes
) => {
  try {
    // Retrieve the user's document reference
    const docRef = doc(db, "users", userUid);

    // Get the user's document snapshot
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;

      // Create a new movie object
      const newMovie = createMovie(
        movieId,
        movieName,
        movieRating,
        movieTags,
        movieNotes
      );

      // Add the new movie to the movies array
      userData.movies.push(newMovie);

      // Update the user's document with the modified user_data
      await updateDoc(docRef, { user_data: userData });
      console.log("New movie added successfully.");
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
        console.log("movie found");
        console.log(movie.movie_tags);
        return movie; // Return the movie if found
      } else {
        console.log("Movie not found.");
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
        console.log("Episode field updated successfully.");
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

const addNewEpisode = async (
  episodeId,
  episodeName,
  episodeRating,
  episodeTags,
  episodeNotes
) => {
  try {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().user_data;
      const newEpisode = createEpisode(
        episodeId,
        episodeName,
        episodeRating,
        episodeTags,
        episodeNotes
      );

      userData.tv_shows.push(newEpisode);

      await updateDoc(docRef, { user_data: userData });
      console.log("New episode added successfully.");
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
        console.log("episode found");
        console.log(episode.episode_tags);
        return episode; // Return the movie if found
      } else {
        console.log("episode not found.");
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

export {
  //authentification
  signInWithGoogle,
  logout,
  db,
  auth,
  //movies
  getMovie,
  updateUserMovieField,
  addNewMovie,
  //episodes
  updateEpisodeField,
  addNewEpisode,
  getEpisode,
};
