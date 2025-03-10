import { useState, useEffect } from "react";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import css from "./FavorstesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);
  console.log(localStorage.getItem("favorites"));

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((card) => card.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={css.favoritContainer}>
      <p>Filter</p>
      <button>Popular</button>
      {favorites.length === 0 ? (
        <p>No favorite psychologists yet.</p>
      ) : (
        favorites.map((card) => (
          <PsychologistCard
            key={card.id}
            {...card}
            onRemove={removeFromFavorites}
          />
        ))
      )}
    </div>
  );
};
export default FavoritesPage;
