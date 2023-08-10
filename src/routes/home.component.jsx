import React, { useState, useEffect } from 'react';
import Card from '../components/shows-card.component';
import MovieCard from '../components/movies-card.component';
import FirestoreUpdate from '../components/firestore-update';

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [selectedId, setFisetSelectedId] = useState(null);
  const apiKey = '1b2efb1dfa6123bdd9569b0959c0da2';

  return (

    <div>
    <h1 className="text-5xl font-bold text-center padding">Search Media</h1>
    <div>
    <FirestoreUpdate label={'Update movie'}/>
    </div>
    <div class="text-2xl flex flex-col items-center justify-center h-screen gap-y-10">
    <div className="flex flex-col w-full border-opacity-50">
  <div className="items-center grid h-100 card bg-base-100 rounded-box place-items-left">
   <div className = "carousel carousel-beginning rounded-box">
     <div className = "carousel-item">
     <Card className = "rounded-box"/>
     </div>
     </div>
     <div className="divider"></div>
     <div className="grid h-300 card bg-base-100 rounded-box place-items-left">
     <div className = "carousel-item">
     <MovieCard className = "rounded-box"/>
     </div>
     </div>
     </div>
     </div>
 </div> 
 </div>

  );
};

export default Home;
