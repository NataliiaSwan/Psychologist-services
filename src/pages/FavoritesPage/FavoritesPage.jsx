import { useState, useEffect, useMemo, useRef } from "react";
import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
import FavoritesFilter from "../../components/FavoritesFilter/FavoritesFilter.jsx";
import css from "./FavoritesPage.module.css";

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

  // Видалення картки з улюблених
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((card) => card.id !== id);
    setFavorites(updatedFavorites); // Оновлюємо стейт
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Зберігаємо в localStorage
  };

  // Фільтрація фаворитів
  const filteredFavorites = useMemo(() => {
    if (filter === "POPULAR") return favorites.filter((p) => p.rating >= 4);
    if (filter === "NOT_POPULAR") return favorites.filter((p) => p.rating < 4);
    return favorites;
  }, [favorites, filter]);

  // Вибірка видимих карток (за пагінацією)
  const visibleFavorites = useMemo(
    () => filteredFavorites.slice(0, visibleCount),
    [filteredFavorites, visibleCount]
  );

  // Завантаження більше карток
  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Отримання лейбла для кнопки фільтра
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

  // Обробка зміни фільтру
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false);
    setVisibleCount(3); // скидаємо лічильник при зміні фільтру
  };

  // Закриття фільтра при натисканні поза ним
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
    <div className={css.favoritsContainer}>
      <h1 className={css.filterTitle}>Favorites</h1>
      <div className={css.filterWrapper}>
        <button
          className={css.filterToggleButton}
          onClick={() => setShowFilter(!showFilter)}
        >
          {getFilterLabel()}
        </button>

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
        {/* Передаємо список фаворитів та функцію для видалення */}
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
  );
};

export default FavoritesPage;
