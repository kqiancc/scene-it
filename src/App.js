import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home.component";
import Navigation from "./routes/navigation.component";
import SignIn from "./routes/sign-in.component";
import ShowDetails from "./routes/show-details.component";
import Recents from "./routes/recents.component";
import Favorites from "./routes/favorites.component";
import DisplaySeasons from "./routes/display-seasons.component";
import MovieDetails from "./routes/movie-details.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="recents" element={<Recents />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="show-details" element={<ShowDetails />} />
        <Route path="display-seasons" element={<DisplaySeasons />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="movie-details" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
