import React, { useState, useEffect } from 'react';
import Filters from '../components/filters.component';
import Card from '../components/shows-card.component';
import MovieCard from '../components/movies-card.component';

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [selectedId, setFisetSelectedId] = useState(null);
  const apiKey = '1b2efb1dfa6123bdd9569b0959c0da2';

  return (
    <div className='App'>
    <h1 className="text-5xl font-bold text-center padding">search shows</h1>
   
    <div className="flex flex-col w-full border-opacity-50">
  <div className="grid h-100 card bg-base-300 rounded-box place-items-left">
   <div className = "carousel carousel-beginning rounded-box">
     <div className = "carousel-item">
     <Card className = "rounded-box"/>
     </div>
     </div>
     <div className="divider"></div>
     <div className="grid h-300 card bg-base-300 rounded-box place-items-left">
     <div className = "carousel-item">
     <MovieCard className = "rounded-box"/>
     </div>
     </div>
     </div>
 </div> 
 </div>
  );
};

export default Home;
