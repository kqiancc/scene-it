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
import { useAuthState } from "react-firebase-hooks/auth";
import Account from "./components/account";
import { auth } from "./firebase/firebase";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Routes>
      <Route path="/" element={<Navigation user={user} />}>
        <Route index element={<Home />} />
        <Route path="saved" element={<Saved user={user} />} />
        <Route path="show-details" element={<ShowDetails />} />
        <Route
          path="display-episodes"
          element={<DisplayEpisodes user={user} />}
        />
        <Route path="favorites" element={<Favorites user={user} />} />
        <Route path="movie-details" element={<MovieDetails user={user} />} />
        <Route
          path="/login"
          element={<Login user={user} loading={loading} error={error} />}
        />
        <Route path="/account" element={<Account user={user} />} />
      </Route>
    </Routes>
  );
};

export default App;
