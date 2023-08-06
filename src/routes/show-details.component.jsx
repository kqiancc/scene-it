
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const DisplayEpisodes = () => {
  const location = useLocation();
  const showId = location.state?.showId || null;

  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const HandleButtonClick = (showId, seasonNumber) => {
    // Use the navigate function to navigate to the "/display-episodes" route
    navigate('/display-episodes', { state: { showId, seasonNumber } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25'; 
    const fetchSeasons = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${showId.id}?api_key=${apiKey}&language=en-US&append_to_response=seasons`
        );
        const data = await response.json();

        if (data.seasons) {
          setSeasons(data.seasons);
          setLoading(false);
        } else {
          setError('Seasons data not found.');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    if (showId) { fetchSeasons();} 
    else {setLoading(false);}
  }, [showId]);

  if (loading) {return <div>Loading...</div>;}

  if (error) {return <div>{error}</div>;}

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${showId.poster_path}`}
            alt={`${showId.name}`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${showId.name}`}</h2>
          <p>Rating: {showId.vote_average}/10</p>
          <p>Released: {showId.first_air_date}</p>    
          <p>{showId.overview}</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
  {seasons.map((season) => (
    season.season_number > 0 && (
      <li key={season.id} style={{ marginRight: '10px', marginBottom: '10px' }}>
        <button className="btn btn-outline btn-warning"  
        onClick={() => HandleButtonClick(showId, season.season_number)}>
          Season {season.season_number} - {season.episode_count} episodes
        </button>
      </li>
    )
  ))}
</ul>

    </div>
  );
};

export default DisplayEpisodes;


