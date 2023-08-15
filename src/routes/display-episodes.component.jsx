import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Notes from "../components/notes.component";
import Heart from "../components/heart";
import {toggleEpFav, deleteTagFromEpisode, getEpisode} from "../firebase/firebase";
import Spinner from "../firebase/spinner";

const DisplayEpisodes = (userUid) => {
  const location = useLocation();
  const show = location.state?.show || null;
  const seasonNumber = location.state?.seasonNumber || null;

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
        try {
            const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${show.id}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`
            );
            const data = await response.json();

            if (data.episodes) {
                const episodesWithUserData = await Promise.all(data.episodes.map(async (episode) => {
                    const userEpisodeData = await getEpisode(episode.id);
                    console.log(episode.episode_tags);
                    return {
                        ...episode,
                        isHeartClicked: userEpisodeData?.is_heart_clicked || false,
                        tags: userEpisodeData?.episode_tags || [],
                        notes: userEpisodeData?.episode_notes || []
                    };
                }));
                setEpisodes(episodesWithUserData);
                setLoading(false);
            } else {
                setError("Episodes data not found.");
                setLoading(false);
            }
        } catch (error) {
            setError("Error fetching data.");
            setLoading(false);
        }
    };

    if (show) {
        fetchEpisodes();
    } else {
        setLoading(false);
    }
}, [show, seasonNumber, userUid]); // Added userUid as a dependency


  const handleTagsChange = (episodeId, newTags) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) =>
        episode.id === episodeId ? { ...episode, tags: newTags } : episode
      )
    );
  };

  const handleTagDelete = (episodeId, tagToDelete) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) =>
        episode.id === episodeId
          ? { ...episode, tags: episode.tags.filter((tag) => tag !== tagToDelete) }
          : episode
      )
    );
    deleteTagFromEpisode(episodeId, tagToDelete);

    const updatedTags = episodes.find((episode) => episode.id === episodeId)?.tags || [];
  };

  const handleNotesChange = (episodeId, newNotes) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) =>
        episode.id === episodeId ? { ...episode, notes: newNotes } : episode
      )
    );
  };

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleHeartClick = (episodeId) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) => {
        if (episode.id === episodeId) {
          const newHeartState = !episode.isHeartClicked;
          toggleEpFav(
            show.id,
            seasonNumber,
            episode.id,
            episode.name,
            episode.episode_number,
            newHeartState
          );
          return { ...episode, isHeartClicked: newHeartState };
        }
        return episode;
      })
    );
  };
  

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-5xl text-center p-5 h-28">
        Season {seasonNumber}
      </h1>
      <div />
      {episodes.map((episode) => (
        <div
          className="collapse collapse-plus bg-base-200 w-9/12 "
          key={episode.id}
        >
           <input type="checkbox" name="my-accordion-3 flex flex-row items-center" />
          <div className="collapse-title text-xl"> 
            <figure className="float-left">
            {episode.still_path ? (
              <img className = "rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                alt={`Episode ${episode.episode_number} - ${episode.name}`}
                style={{ width: "300px", height: "auto" }}
              />
              ) : (
                <div style={{ width: "300px", height: "175px" }} className="flex justify-center items-center w-full h-96 bg-base-100 rounded text-2xl text-base-content text-center">
                  No Poster Image Currently Found
                </div>
              )}
            </figure>
            <div className="card-body select-text">
              <h2 className="font-bold text-2xl">
                Episode {episode.episode_number}: {episode.name}
              </h2>
              <h1 className="italic">
                {episode.vote_average}/10 - {episode.runtime} minutes
              </h1>
              <h1 className="italic">Aired: {episode.air_date} </h1>
              <p>{episode.overview}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="collapse-content">
            <Heart
              showId = {show.id}
              seasonNumber = {seasonNumber} 
              episodeId={episode.id}
              episodeNumber= {episode.episode_number}
              episodeName = {episode.name}
              isHeartClicked={episode.isHeartClicked}
              handleHeartClick={handleHeartClick}
            />
            <div className="divider" />
            <Notes
              episodeData={episode}
              onTagsChange={(newTags) => handleTagsChange(episode.id, newTags)}
              onNotesChange={(newNotes) =>
                handleNotesChange(episode.id, newNotes)}
                onTagDelete={(episodeId, tagToDelete) => handleTagDelete(episodeId, tagToDelete)} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayEpisodes;
