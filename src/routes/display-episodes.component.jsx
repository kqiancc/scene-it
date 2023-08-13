import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Notes from "../components/notes.component";
import Heart from "../components/heart";
import {toggleEpFav} from "../firebase/firebase"

const DisplayEpisodes = () => {
  const location = useLocation();
  const show = location.state?.show || null;
  const seasonNumber = location.state?.seasonNumber || null;

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${show.id}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();

        if (data.episodes) {
          setEpisodes(
            data.episodes.map((episode) => ({
              ...episode,
              isHeartClicked:
                JSON.parse(
                  localStorage.getItem(
                    `isHeartClicked_${show.id}_${seasonNumber}_${episode.id}`
                  )
                ) || false,
              tags:
                JSON.parse(
                  localStorage.getItem(
                    `tags_${show.id}_${seasonNumber}_${episode.id}`
                  )
                ) || [],
              notes:
                JSON.parse(
                  localStorage.getItem(
                    `notes_${show.id}_${seasonNumber}_${episode.id}`
                  )
                ) || [],
            }))
          );
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
  }, [show, seasonNumber]);

  const handleTagsChange = (episodeId, newTags) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) =>
        episode.id === episodeId ? { ...episode, tags: newTags } : episode
      )
    );
    localStorage.setItem(
      `tags_${show.id}_${seasonNumber}_${episodeId}`,
      JSON.stringify(newTags)
    );
  };

  const handleNotesChange = (episodeId, newNotes) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) =>
        episode.id === episodeId ? { ...episode, notes: newNotes } : episode
      )
    );
    localStorage.setItem(
      `notes_${show.id}_${seasonNumber}_${episodeId}`,
      JSON.stringify(newNotes)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleHeartClick = (episodeId) => {
    setEpisodes((prevEpisodes) =>
      prevEpisodes.map((episode) => {
        if (episode.id === episodeId) {
          const newHeartState = !episode.isHeartClicked;
          localStorage.setItem(
            `isHeartClicked_${show.id}_${seasonNumber}_${episodeId}`,
            JSON.stringify(newHeartState)
          );
          toggleEpFav(
            episode.id,
            episode.name,
            episode.vote_average,
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
      <h1 className="font-bold text-5xl text-center p-5">
        Season {seasonNumber}
      </h1>
      <div />
      {episodes.map((episode) => (
        <div
          className="collapse collapse-plus bg-base-200 w-9/12 "
          key={episode.id}
        >
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-small">
            <figure className="float-left">
              <img
                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                alt={`Episode ${episode.episode_number} - ${episode.name}`}
                style={{ width: "300px", height: "auto" }}
              />
            </figure>
            <div className="card-body">
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
              episodeId={episode.id}
              isHeartClicked={episode.isHeartClicked}
              handleHeartClick={handleHeartClick}
            />
            <div className="divider" />
            <Notes
              episodeData={episode}
              onTagsChange={(newTags) => handleTagsChange(episode.id, newTags)}
              onNotesChange={(newNotes) =>
                handleNotesChange(episode.id, newNotes)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayEpisodes;
