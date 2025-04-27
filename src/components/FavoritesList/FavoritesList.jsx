// import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
// import css from "./FavoritesList.module.css";

// const FavoritesList = ({ favorites, onRemove }) => {

//   const handleRemoveFavorite = (id) => {
//     onRemove(id);
//   };

//   if (favorites.length === 0) {
//     return <p>No favorites found!</p>;
//   }

//   return (
//     <div className={css.favoriteContainer}>
//       <div className={css.cardsWrapper}>
//         {favorites.map((card, index) => {
//           const key = card?.id ?? index;
//           return (
//             <PsychologistCard
//               key={key}
//               {...card}
//               onRemoveFavorite={handleRemoveFavorite}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default FavoritesList;

import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
import css from "./FavoritesList.module.css";

const FavoritesList = ({ favorites, onRemove }) => {
  const handleRemoveFavorite = (id) => {
    onRemove(id);
  };

  return (
    <div className={css.favoriteContainer}>
      <div className={css.cardsWrapper}>
        {favorites.length === 0 ? (
          <div className={css.emptyState}>No favorites found!</div>
        ) : (
          favorites.map((card, index) => {
            const key = card?.id ?? index;
            return (
              <PsychologistCard
                key={key}
                {...card}
                onRemoveFavorite={handleRemoveFavorite}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
