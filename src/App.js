import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home.component";
import Navigation from "./routes/navigation.component";
import TVDetails from "./routes/tv-details.component";
import Saved from "./routes/saved.component";
import Favorites from "./routes/favorites.component";
import MovieDetails from "./routes/movie-details.component";
import DisplayEpisodes from "./routes/display-episodes.component";
import Login from "./firebase/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Routes>
      <Route path='/' element={<Navigation user={user} />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home user={user} />} />
        <Route path='saved' element={<Saved user={user} />} />
        <Route path='tv-details' element={<TVDetails />} />
        <Route
          path='display-episodes'
          element={<DisplayEpisodes user={user} />}
        />
        <Route path='favorites' element={<Favorites user={user} />} />
        <Route path='movie-details' element={<MovieDetails user={user} />} />
        <Route
          path='login'
          element={<Login user={user} loading={loading} error={error} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
