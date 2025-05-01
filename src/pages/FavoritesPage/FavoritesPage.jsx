import { useState, useEffect, useMemo, useRef } from "react";
import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
import FavoritesFilter from "../../components/FavoritesFilter/FavoritesFilter.jsx";
import css from "./FavoritesPage.module.css";
import { motion } from "framer-motion";
import FilterToggleButton from "../../components/FilterToggleButton/FilterToggleButton";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const filterRef = useRef(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
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
    if (filter === "POPULAR") return favorites.filter((p) => p.rating >= 4);
    if (filter === "NOT_POPULAR") return favorites.filter((p) => p.rating < 4);
    return favorites;
  }, [favorites, filter]);

  const visibleFavorites = useMemo(
    () => filteredFavorites.slice(0, visibleCount),
    [filteredFavorites, visibleCount]
  );

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const filterLabels = {
    ALL: "Show all",
    POPULAR: "Popular",
    NOT_POPULAR: "Not popular",
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false);
    setVisibleCount(3);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css.favoritesContainer}>
        <h1 className={css.filterTitle}>Favorites</h1>

        <div className={css.filterWrapper}>
          <FilterToggleButton
            currentFilter={filter}
            isOpen={showFilter}
            onClick={() => setShowFilter(!showFilter)}
            filterLabels={filterLabels}
          />

          {showFilter && (
            <div ref={filterRef} className={css.dropdownMenu}>
              <FavoritesFilter
                selectedFilter={filter}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>

        <div className={css.favoritsContent}>
          <FavoritesList
            favorites={visibleFavorites}
            onRemove={removeFromFavorites}
          />

          {visibleCount < filteredFavorites.length && (
            <button className={css.loadMoreButton} onClick={loadMore}>
              Load More
            </button>
          )}

          {visibleCount >= filteredFavorites.length &&
            filteredFavorites.length > 0 && (
              <p className={css.endMessage}>No more favorites to show</p>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default FavoritesPage;
