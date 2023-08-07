import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home.component";
import Navigation from "./routes/navigation.component";
import ShowDetails from "./routes/show-details.component";
import Saved from "./routes/saved.component";
import Favorites from "./routes/favorites.component";
import MovieDetails from "./routes/movie-details.component";
import DisplayEpisodes from "./routes/display-episodes.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="saved" element={<Saved />} />
        <Route path="show-details" element={<ShowDetails />} />
        <Route path="display-episodes" element={<DisplayEpisodes />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="movie-details" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
