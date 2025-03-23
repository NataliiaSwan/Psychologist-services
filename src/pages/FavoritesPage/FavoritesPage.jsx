// import { useState, useEffect, useMemo } from "react";
// import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
// import FavoritesFilter from "../../components/FavoritesFilter/FavoritesFilter.jsx";
// import css from "./FavorstesPage.module.css";

// const FavoritesPage = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [filter, setFilter] = useState("ALL");
//   const [showFilter, setShowFilter] = useState(false);

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(storedFavorites);
//   }, []);

//   const removeFromFavorites = (id) => {
//     const updatedFavorites = favorites.filter((card) => card.id !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   const filteredFavorites = useMemo(() => {
//     if (filter === "POPULAR") {
//       return favorites.filter((p) => p.rating >= 4);
//     }
//     if (filter === "NOT_POPULAR") {
//       return favorites.filter((p) => p.rating < 4);
//     }
//     return favorites;
//   }, [favorites, filter]);

//   // Поточна назва для кнопки
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

//   // Коли вибираєш фільтр — закриваємо меню
//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     setShowFilter(false);
//   };

//   return (
//     <div className={css.favoritContainer}>
//       <h1 className={css.filterTitle}>Favorites</h1>

//       {/* Кнопка для відкриття меню фільтрів */}
//       <button
//         className={css.filterToggleButton}
//         onClick={() => setShowFilter(!showFilter)}
//       >
//         {getFilterLabel()}
//       </button>

//       {/* Якщо натиснули — показується список фільтрів */}
//       {showFilter && (
//         <FavoritesFilter
//           selectedFilter={filter}
//           onFilterChange={handleFilterChange}
//         />
//       )}

//       <FavoritesList
//         favorites={filteredFavorites}
//         onRemove={removeFromFavorites}
//       />
//     </div>
//   );
// };

// export default FavoritesPage;

import { useState, useEffect, useMemo } from "react";
import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
import FavoritesFilter from "../../components/FavoritesFilter/FavoritesFilter.jsx";
import css from "./FavorstesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Очистка дублікатів по id
    const uniqueFavorites = storedFavorites.filter(
      (fav, index, self) => index === self.findIndex((f) => f.id === fav.id)
    );

    if (uniqueFavorites.length !== storedFavorites.length) {
      localStorage.setItem("favorites", JSON.stringify(uniqueFavorites));
    }

    setFavorites(uniqueFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((card) => card.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredFavorites = useMemo(() => {
    if (filter === "POPULAR") {
      return favorites.filter((p) => p.rating >= 4);
    }
    if (filter === "NOT_POPULAR") {
      return favorites.filter((p) => p.rating < 4);
    }
    return favorites;
  }, [favorites, filter]);

  const getFilterLabel = () => {
    switch (filter) {
      case "POPULAR":
        return "Popular";
      case "NOT_POPULAR":
        return "Not popular";
      default:
        return "Show all";
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false);
  };

  return (
    <div className={css.favoritContainer}>
      <h1 className={css.filterTitle}>Favorites</h1>

      <button
        className={css.filterToggleButton}
        onClick={() => setShowFilter(!showFilter)}
      >
        {getFilterLabel()}
      </button>

      {showFilter && (
        <FavoritesFilter
          selectedFilter={filter}
          onFilterChange={handleFilterChange}
        />
      )}

      <FavoritesList
        favorites={filteredFavorites}
        onRemove={removeFromFavorites}
      />
    </div>
  );
};

export default FavoritesPage;
