import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import { useState, useEffect } from "react";
import css from "./App.module.css";
import Loader from "../../components/Loader/Loader.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className={css.app}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.appContent}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/psychologists" element={<PsychologistPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
