import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../firebase/spinner";

const TVDetails = () => {
  const location = useLocation();
  const show = location.state?.item || null;

  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const HandleButtonClick = (show, seasonNumber) => {
    // Use the navigate function to navigate to the "/display-episodes" route
    navigate("/display-episodes", { state: { show, seasonNumber } });
  };

  useEffect(() => {
    const apiKey = "1b2efb1dfa6123bdd9569b0959c0da25";
    const fetchSeasons = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${show.id}?api_key=${apiKey}&language=en-US&append_to_response=seasons`
        );
        const data = await response.json();

        if (data.seasons) {
          setSeasons(data.seasons);
          setLoading(false);
        } else {
          setError("Seasons data not found.");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    if (show) {
      fetchSeasons();
    } else {
      setLoading(false);
    }
  }, [show]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-10/12 shadow-xl bg-base-300 rounded-xl">
        <figure className="flex-shrink-0 float-left m-6">
          {show.poster_path ? (
            <img
              className="rounded"
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={`${show.name}`}
              style={{ width: "300px", height: "auto" }}
            />
          ) : (
            <div
              style={{ width: "300px", height: "450px" }}
              className="flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content"
            >
              No Poster Image Currently Found
            </div>
          )}
        </figure>
        <div className="max-w-full card-body">
          <h2 className="text-3xl font-bold">{`${show.name}`}</h2>
          <p className="text-xl">
            {seasons.filter((season) => season.season_number > 0).length}{" "}
            Seasons -{" "}
            {seasons.reduce(
              (total, season) =>
                season.season_number > 0 ? total + season.episode_count : total,
              0
            )}{" "}
            Episodes
          </p>
          <p className="text-xl italic">Rating: {show.vote_average}/10</p>
          <p className="text-xl italic">Released: {show.first_air_date}</p>
          <p className="text-xl">{show.overview}</p>
          <div className="justify-end card-actions"></div>
        </div>
      </div>
      <div />

      {seasons.map(
        (season) =>
          season.season_number > 0 && (
            <div
              className="flex w-9/12 rounded-lg shadow-xl bg-base-200"
              key={season.id}
            >
              <button
                onClick={() => HandleButtonClick(show, season.season_number)}
              >
                <div className="flex items-center text-xl collapse-title">
                  <figure className="flex-shrink-0 float-left m-5">
                    {season.poster_path ? (
                      <img
                        className="rounded"
                        src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                        alt={`Episode ${season.episode_number} - ${season.name}`}
                        style={{ width: "175px", height: "auto" }}
                      />
                    ) : (
                      <div
                        style={{ width: "175px", height: "250px" }}
                        className="flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content"
                      >
                        No Poster Image Currently Found
                      </div>
                    )}
                  </figure>
                  <div className="text-left card-body">
                    <h2 className="text-2xl font-bold">
                      Season {season.season_number}
                    </h2>
                    <p className="text-lg">{season.episode_count} Episodes</p>
                    <p className="text-lg italic">{season.vote_average}/10</p>
                    <p className="text-lg italic">Aired: {season.air_date} </p>
                    <p className="text-xl">{season.overview}</p>
                    <div className="justify-end card-actions">
                      <div className="gap-1 rating"></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )
      )}
    </div>
  );
};

export default TVDetails;
