
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spinner from '../firebase/spinner';

const TVDetails = () => {
  const location = useLocation();
  const show = location.state?.item || null;

  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const HandleButtonClick = (show, seasonNumber) => {
    // Use the navigate function to navigate to the "/display-episodes" route
    navigate('/display-episodes', { state: { show, seasonNumber } });
  };

  useEffect(() => {
    const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25'; 
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
          setError('Seasons data not found.');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    if (show) { fetchSeasons();} 
    else {setLoading(false);}
  }, [show]);

  if (loading) {return <Spinner/>;}

  if (error) {return <div>{error}</div>;}

  return (
    <div className = "flex flex-col items-center">
      <div className="flex bg-base-300 shadow-xl w-10/12 rounded-xl">
        <figure className="collapse-title items-center">
          <img className = "rounded"
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={`${show.name}`}
            style={{ width: '300px', height: 'auto' }} 
            />
        </figure>
        <div className="card-body max-w-full">
          <h2 className="font-bold text-3xl">{`${show.name}`}</h2>
          <p className="text-xl">{seasons.filter(season => season.season_number > 0).length} Seasons - {seasons.reduce((total, season) => (season.season_number > 0 ? 
            total + season.episode_count : total), 0)} Episodes</p>
          <p className="italic text-xl">Rating: {show.vote_average}/10</p>
          <p className="italic text-xl">Released: {show.first_air_date}</p> 
          <p className="text-xl">{show.overview}</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
      <div/>  
     
  {seasons.map((season) => (
    season.season_number > 0 && (
          <div className="flex bg-base-200 shadow-xl w-9/12 rounded-lg" key={season.id}>
           <button 
        onClick={() => HandleButtonClick(show, season.season_number)}>
            <div className="collapse-title text-xl">
               <figure className = "float-left items-center justify-center ">
                <img className = "rounded"
               src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
               alt={`Episode ${season.episode_number} - ${season.name}`}
               style={{ width: '175px', height: 'auto' }} 
               />
                </figure>
          <div className="card-body text-left">
             <h2 className="font-bold text-2xl">
             Season {season.season_number}</h2>
             <p className="text-lg" >{season.episode_count} Episodes</p>
            <p className = "italic text-lg">{season.vote_average}/10</p>
            <p className = "italic text-lg">Aired: {season.air_date} </p>
            <p className = "text-xl" >{season.overview}</p>
            <div className="card-actions justify-end">
            <div className="rating gap-1"></div>
            </div>
            </div>
            </div>
            </button>
            </div>
            )
            ))}
        </div>
  );
};

export default TVDetails;

