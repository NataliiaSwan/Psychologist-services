import { useEffect, useState, useRef, useMemo } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
import css from "./PsychologistListCard.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useLocation } from "react-router-dom";

const filterLabels = {
  ALL: "Show All",
  A_TO_Z: "A to Z",
  Z_TO_A: "Z to A",
  PRICE_LOW: "Less than 10$",
  PRICE_HIGH: "Greater than 10$",
  POPULAR: "Popular",
  NOT_POPULAR: "Not Popular",
};

const applyFilter = (list, selectedFilter, experiencedFilter) => {
  let filteredList = experiencedFilter
    ? list.filter((p) => parseInt(p.experience) >= 20)
    : list;

  switch (selectedFilter) {
    case "A_TO_Z":
      return [...filteredList].sort((a, b) => a.name.localeCompare(b.name));
    case "Z_TO_A":
      return [...filteredList].sort((a, b) => b.name.localeCompare(a.name));
    case "PRICE_LOW":
      return filteredList.filter((p) => p.price_per_hour < 10);
    case "PRICE_HIGH":
      return filteredList.filter((p) => p.price_per_hour >= 10);
    case "POPULAR":
      return filteredList.filter((p) => p.rating >= 4);
    case "NOT_POPULAR":
      return filteredList.filter((p) => p.rating < 4);
    default:
      return filteredList;
  }
};

const PsychologistListCard = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const filterRef = useRef(null);

  // Fetching psychologists data
  useEffect(() => {
    setIsLoading(true);
    fetchPsychologists()
      .then((data) => {
        const psychologistsWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setPsychologists(psychologistsWithId);
        console.log("Psychologists after fetching:", psychologistsWithId);
      })
      .catch((error) => console.error("Error fetching psychologists:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Handling outside click to close filter dropdown
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

  // Get the experience filter from URL
  const params = new URLSearchParams(location.search);
  const experiencedFilter = params.get("experience") === "true";

  // Handle filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setVisibleCount(3);
    const filtered = applyFilter(
      psychologists,
      selectedFilter,
      experiencedFilter
    );
    setFilteredPsychologists(filtered);
    setIsFilterOpen(false);
  };

  // Load more psychologists
  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visiblePsychologists = useMemo(
    () => filteredPsychologists.slice(0, visibleCount),
    [filteredPsychologists, visibleCount]
  );

  useEffect(() => {
    console.log("Experience filter from URL:", experiencedFilter);

    psychologists.forEach((psychologist) => {
      const experienceInYears = parseInt(psychologist.experience);
      console.log(
        `Psychologist ${psychologist.id}: Experience ${psychologist.experience} => ${experienceInYears} years`
      );
    });

    const filtered = applyFilter(psychologists, filter, experiencedFilter);
    setFilteredPsychologists(filtered);
  }, [location.search, psychologists, filter, experiencedFilter]);

  return (
    <div>
      <h1 className={css.filterTitle}>Filter</h1>
      <div className={css.filterToggleButtonWrapper}>
        <button
          className={css.filterToggleButton}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {filterLabels[filter]}
          <svg
            className={`${css.iconVectorBottom} ${
              isFilterOpen ? css.iconVectorTop : ""
            }`}
          >
            <use href={`${sprite}#icon-vector-bottom`} />
          </svg>
        </button>

        {isFilterOpen && (
          <div ref={filterRef} className={css.filterWrapper}>
            <div className={css.dropdownMenu}>
              <FilterComponent
                onFilterChange={handleFilterChange}
                selectedFilter={filter}
              />
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <p className={css.loading}>Loading psychologists...</p>
      ) : (
        <>
          <div className={css.psychologistListContainer}>
            {visiblePsychologists.length > 0 ? (
              visiblePsychologists.map((psychologist) => (
                <PsychologistCard key={psychologist.id} {...psychologist} />
              ))
            ) : (
              <p className={css.noResult}>
                No psychologists found for selected filter
              </p>
            )}
            {visibleCount < filteredPsychologists.length && (
              <button className={css.loadMoreButton} onClick={loadMore}>
                Load More
              </button>
            )}
          </div>

          {visibleCount >= filteredPsychologists.length &&
            filteredPsychologists.length > 0 && (
              <p className={css.endMessage}>No more psychologists to show</p>
            )}
        </>
      )}
    </div>
  );
};

export default PsychologistListCard;
