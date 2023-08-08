import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home.component";
import Navigation from "./routes/navigation.component";
import ShowDetails from "./routes/show-details.component";
import Saved from "./routes/saved.component";
import Favorites from "./routes/favorites.component";
import MovieDetails from "./routes/movie-details.component";
import DisplayEpisodes from "./routes/display-episodes.component";
import Login from "./firebase/login";
import firebase from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const auth = firebase.firebaseAuth;
  const [user, loading, error] = useAuthState(auth);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="saved" element={<Saved />} />
        <Route path="show-details" element={<ShowDetails />} />
        <Route path="display-episodes" element={<DisplayEpisodes />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="movie-details" element={<MovieDetails />} />
        <Route
          path="/Login"
          element={<Login user={user} loading={loading} error={error} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
