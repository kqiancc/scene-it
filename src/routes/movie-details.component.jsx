import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getMovie,
  toggleMovieFav,
  deleteTagFromMovie,
} from "../firebase/firebase"; // Import your addNewMovie function
import { getAuth } from "firebase/auth"; // Import Firebase's authentication module
import MovieNotes from "../components/movie-notes";
import Spinner from "../firebase/spinner";

const MovieDetails = ({ userUid }) => {
  const location = useLocation();
  const movie = location.state?.item || null;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();

        if (data) {
          const userMovieData = await getMovie(movie.id);
          const movieWithUserData = {
            ...data,
            isHeartClicked: userMovieData?.is_heart_clicked || false,
            tags: userMovieData?.movie_tags || [],
            notes: userMovieData?.movie_notes || [],
          };
          setMovies([movieWithUserData]);
          setLoading(false);
        } else {
          setError("Movie data not found.");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    if (movie) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [movie, userUid]);

  const handleTagsChange = (movieId, newTagsInput) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              // Combine existing tags with the new ones, ensuring uniqueness
              tags: [...new Set([...movie.tags, ...newTagsInput])],
            }
          : movie
      )
    );
  };

  const handleTagDelete = async (movieId, tagToDelete) => {
    try {
      await deleteTagFromMovie(movieId, tagToDelete); // First, delete the tag from the database

      // If deletion is successful, then update the local state
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId
            ? {
                ...movie,
                tags: movie.tags.filter((tag) => tag !== tagToDelete),
              }
            : movie
        )
      );
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleNotesChange = (movieId, newNotes) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, notes: newNotes } : movie
      )
    );
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      {movies.map((mergedMovie) => (
        <>
          <div className='flex items-center w-10/12 shadow-xl bg-base-300 rounded-xl'>
            <figure className='flex-shrink-0 float-left m-6'>
              {mergedMovie.poster_path ? (
                <img
                  className='rounded'
                  src={`https://image.tmdb.org/t/p/w500${mergedMovie.poster_path}`}
                  alt={`${mergedMovie.title}`}
                  style={{ width: "300px", height: "auto" }}
                />
              ) : (
                <div
                  style={{ width: "300px", height: "450px" }}
                  className='flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-300 text-base-content'
                >
                  No Poster Image Currently Found
                </div>
              )}
            </figure>
            <div className='max-w-full card-body'>
              <h2 className='text-3xl font-bold'>{`${mergedMovie.title}`}</h2>
              <p className='text-xl italic'>
                Rating: {mergedMovie.vote_average}/10 - {mergedMovie.runtime}{" "}
                minutes
              </p>
              <p className='text-xl italic'>
                Released: {mergedMovie.release_date}
              </p>
              <p className='text-xl'>{mergedMovie.overview}</p>
              <div className='justify-end card-actions'></div>
            </div>
          </div>
          <div className='w-10/12'>
            <MovieNotes
              movieId={mergedMovie.id}
              movieData={mergedMovie}
              onTagsChange={(newTags) =>
                handleTagsChange(mergedMovie.id, newTags)
              }
              onNotesChange={(newNotes) =>
                handleNotesChange(mergedMovie.id, newNotes)
              }
              onTagDelete={(tagToDelete) =>
                handleTagDelete(mergedMovie.id, tagToDelete)
              }
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default MovieDetails;
