import { useEffect, useState, useRef } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
import css from "./PsychologistListCard.module.css";

const PsychologistListCard = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(3);

  const filterRef = useRef(null); // 👉 для кліку поза фільтром

  const filterLabels = {
    ALL: "Show All",
    A_TO_Z: "A to Z",
    Z_TO_A: "Z to A",
    PRICE_LOW: "Less than 10$",
    PRICE_HIGH: "Greater than 10$",
    POPULAR: "Popular",
    NOT_POPULAR: "Not Popular",
  };

  // useEffect(() => {
  //   fetchPsychologists()
  //     .then((data) => {
  //       setPsychologists(data);
  //       setFilteredPsychologists(data); // початково показати всіх
  //     })
  //     .catch((error) => console.error("Error fetching psychologists:", error));
  // }, []);
  useEffect(() => {
    fetchPsychologists()
      .then((data) => {
        // Додаємо id до кожного психолога
        const psychologistsWithId = data.map((item, index) => ({
          ...item,
          id: index + 1, // id — це порядковий номер елемента
        }));

        setPsychologists(psychologistsWithId);
        setFilteredPsychologists(psychologistsWithId); // показує всіх при завантаженні
      })
      .catch((error) => console.error("Error fetching psychologists:", error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsFilterOpen(false); // закрити фільтр після вибору
    setVisibleCount(3); // обнуляємо видимість до перших 3 після нового фільтру

    let filtered = [...psychologists];

    switch (selectedFilter) {
      case "A_TO_Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z_TO_A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "PRICE_LOW":
        filtered = filtered.filter((p) => p.price_per_hour < 10);
        break;
      case "PRICE_HIGH":
        filtered = filtered.filter((p) => p.price_per_hour >= 10);
        break;
      case "POPULAR":
        filtered = filtered.filter((p) => p.rating >= 4);
        break;
      case "NOT_POPULAR":
        filtered = filtered.filter((p) => p.rating < 4);
        break;
      default:
        filtered = [...psychologists];
    }

    setFilteredPsychologists(filtered);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      <div>
        <h1 className={css.filterTitle}>Filter</h1>
        <button className={css.filterToggleButton} onClick={toggleFilter}>
          {filterLabels[filter]}
        </button>

        {isFilterOpen && (
          <div ref={filterRef} className={css.filterWrapper}>
            <FilterComponent onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      <div className={css.psychologistListContainer}>
        {filteredPsychologists.slice(0, visibleCount).map((psychologist) => (
          <PsychologistCard key={psychologist.id} {...psychologist} />
        ))}
      </div>

      {visibleCount < filteredPsychologists.length && (
        <button className={css.loadMoreButton} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PsychologistListCard;
