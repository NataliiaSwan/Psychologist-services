// import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
// import css from "./FavoritesList.module.css";

// const FavoritesList = ({ favorites, onRemove }) => {

//   if (favorites.length === 0) {
//     return <p>No favorites found!</p>;
//   }

//   return (
//     <div className={css.favoriteContainer}>
//       {favorites.map((card, index) => {
//         const key = card?.id ?? index;
//         return (
//           <PsychologistCard
//             key={key}
//             {...card}
//             onRemove={onRemove}
//             onRemoveFavorite={handleRemoveFavorite}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default FavoritesList;

import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
import css from "./FavoritesList.module.css";

const FavoritesList = ({ favorites, onRemove }) => {
  // Тут ми більше не використовуємо setFavorites, оскільки favorites передається через пропс
  const handleRemoveFavorite = (id) => {
    onRemove(id); // Викликаємо onRemove, який має бути переданий як пропс
  };

  if (favorites.length === 0) {
    return <p>No favorites found!</p>;
  }

  return (
    <div className={css.favoriteContainer}>
      {favorites.map((card, index) => {
        const key = card?.id ?? index;
        return (
          <PsychologistCard
            key={key}
            {...card}
            onRemoveFavorite={handleRemoveFavorite} // Пропсуємо функцію для видалення
          />
        );
      })}
    </div>
  );
};

export default FavoritesList;
