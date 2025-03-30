// import { useState, useEffect, useMemo } from "react";
// import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
// import FavoritesFilter from "../../components/FavoritesFilter/FavoritesFilter.jsx";
// import css from "./FavoritesList.module.css";

// const FavoritesPage = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [filter, setFilter] = useState("ALL");
//   const [showFilter, setShowFilter] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(3);

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const uniqueFavorites = storedFavorites.filter(
//       (fav, index, self) => index === self.findIndex((f) => f.id === fav.id)
//     );
//     if (uniqueFavorites.length !== storedFavorites.length) {
//       localStorage.setItem("favorites", JSON.stringify(uniqueFavorites));
//     }
//     setFavorites(uniqueFavorites);
//   }, []);

//   const removeFromFavorites = (id) => {
//     const updatedFavorites = favorites.filter((card) => card.id !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   const filteredFavorites = useMemo(() => {
//     if (filter === "POPULAR") return favorites.filter((p) => p.rating >= 4);
//     if (filter === "NOT_POPULAR") return favorites.filter((p) => p.rating < 4);
//     return favorites;
//   }, [favorites, filter]);

//   const visibleFavorites = useMemo(
//     () => filteredFavorites.slice(0, visibleCount),
//     [filteredFavorites, visibleCount]
//   );

//   const loadMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   };

//   const getFilterLabel = () => {
//     switch (filter) {
//       case "POPULAR":
//         return "Popular";
//       case "NOT_POPULAR":
//         return "Not popular";
//       default:
//         return "Show all";
//     }
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     setShowFilter(false);
//     setVisibleCount(3); // при зміні фільтра скидуємо лічильник
//   };

//   return (
//     <div className={css.favoritsContainer}>
//       <h1 className={css.filterTitle}>Favorites</h1>
//       <div className={css.filterWrapper}>
//         <button
//           className={css.filterToggleButton}
//           onClick={() => setShowFilter(!showFilter)}
//         >
//           {getFilterLabel()}
//         </button>

//         {showFilter && (
//           <div className={css.dropdownMenu}>
//             <FavoritesFilter
//               selectedFilter={filter}
//               onFilterChange={handleFilterChange}
//             />
//           </div>
//         )}
//       </div>

//       <div className={css.favoritsContent}>
//         <FavoritesList
//           favorites={visibleFavorites}
//           onRemove={removeFromFavorites}
//         />

//         {visibleCount < filteredFavorites.length && (
//           <button className={css.loadMoreButton} onClick={loadMore}>
//             Load More
//           </button>
//         )}

//         {visibleCount >= filteredFavorites.length &&
//           filteredFavorites.length > 0 && (
//             <p className={css.endMessage}>No more favorites to show</p>
//           )}
//       </div>
//     </div>
//   );
// };

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
