import React, { useState, useEffect } from "react";
import Card from "../components/shows-card.component";
import MovieCard from "../components/movies-card.component";
import SearchBar from "../components/search-bar.component";

const Home = () => {
  return (
    <div className = "flex flex-col items-center">
      <h1 className="text-7xl font-bold text-center padding mt-40">
        Search Media
      </h1>
       <SearchBar/>
      <div className="text-2xl flex flex-col items-center justify-center h-screen gap-y-10">
        <div className="flex flex-col w-full border-opacity-50">
          <div className="items-center grid h-100 card bg-base-100 rounded-box place-items-left">
            <div className="carousel carousel-beginning rounded-box">
              <div className="carousel-item">
                <Card className="rounded-box" />
              </div>
            </div>
            <div className="divider"></div>
            <div className="grid h-300 card bg-base-100 rounded-box place-items-left">
              <div className="carousel-item">
                <MovieCard className="rounded-box" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
