import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Notes from '../components/notes.component';

const DisplayEpisodes = () => {
  const location = useLocation();
  const showId = location.state?.showId || null;
  const seasonNumber = location.state?.seasonNumber || null;

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${showId.id}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();

        if (data.episodes) {
          setEpisodes(data.episodes);
          setLoading(false);
        } else {
          setError('Episodes data not found.');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    if (showId) {
      fetchEpisodes();
    } else {
      setLoading(false);
    }
  }, [showId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>   
      <h1 className = "font-bold text-5xl text-center p-5"> Season {seasonNumber}</h1> 
      <div/>  
        {episodes.map((episode) => (
          <div className="collapse collapse-plus bg-base-200 w-9/12 justify-right" key={episode.id}>
            <input type="radio" name="my-accordion-3" className= "justify-center" /> 
            <div className="collapse-title text-xl font-small">
               <figure className = "float-left">
                <img  
               src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
               alt={`Episode ${episode.episode_number} - ${episode.name}`}
               style={{ width: '300px', height: 'auto' }} 
               />
                </figure>
          <div className="card-body">
             <h2 className="font-bold text-2xl">
            Episode {episode.episode_number}: {episode.name}
            </h2>
            <h1 className = "italic">{episode.vote_average}/10 - {episode.runtime} minutes</h1>
            <h1 className = "italic">Aired: {episode.air_date} </h1>
            <p >{episode.overview}</p>
            <div className="card-actions justify-end">
            <div className="rating gap-1">
              {/*make button like clickable...*/}
              <input type="radio" name="rating-3" className="mask mask-heart bg-purple-400" />
              </div> 
              </div>
              </div>
            </div>
            <div className="collapse-content">   
            <Notes/> 
           </div>
          </div>
        ))}
       
    </div>
  );
};

export default DisplayEpisodes;