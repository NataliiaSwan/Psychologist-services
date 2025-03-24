import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./FavoritesList.module.css";

const FavoritesList = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return <p>No favorites found!</p>;
  }

  return (
    <div className={css.favoriteContainer}>
      {favorites.map((psychologist) => (
        <PsychologistCard
          key={psychologist.id}
          {...psychologist}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
