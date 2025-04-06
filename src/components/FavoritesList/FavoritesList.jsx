// export default FavoritesPage;

import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
import css from "./FavoritesList.module.css";

const FavoritesList = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return <p>No favorites found!</p>;
  }

  return (
    <div className={css.favoriteContainer}>
      {favorites.map((card, index) => {
        const key = card?.id ?? index; // захист, якщо id відсутній
        return <PsychologistCard key={key} {...card} onRemove={onRemove} />;
      })}
    </div>
  );
};

export default FavoritesList;
