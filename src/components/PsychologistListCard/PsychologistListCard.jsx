import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPsychologists } from "../../services/psychologistService.js";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
import FilterToggleButton from "../../components/FilterToggleButton/FilterToggleButton.jsx";
import css from "./PsychologistListCard.module.css";

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
    ? list.filter((p) => parseInt(p.experience) >= 15)
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
  const [searchParams] = useSearchParams();
  const experiencedParam = searchParams.get("experienced");
  const showExperiencedOnly = experiencedParam === "true";

  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPsychologists()
      .then((data) => {
        const psychologistsWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setPsychologists(psychologistsWithId);
      })
      .catch((error) => console.error("Error fetching psychologists:", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filtered = applyFilter(psychologists, filter, showExperiencedOnly);
    setFilteredPsychologists(filtered);
    setVisibleCount(3);
  }, [psychologists, filter, showExperiencedOnly]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsFilterOpen(false);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visiblePsychologists = useMemo(
    () => filteredPsychologists.slice(0, visibleCount),
    [filteredPsychologists, visibleCount]
  );

  return (
    <div>
      <h1 className={css.filterTitle}>Filter</h1>
      <div className={css.filterToggleButtonWrapper}>
        <FilterToggleButton
          currentFilter={filter}
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          filterLabels={filterLabels}
        />

        {isFilterOpen && (
          <div className={css.filterWrapper}>
            <FilterComponent
              onFilterChange={handleFilterChange}
              selectedFilter={filter}
            />
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
          </div>

          {visibleCount < filteredPsychologists.length && (
            <div className={css.boxButton}>
              <button className={css.loadMoreButton} onClick={loadMore}>
                Load More
              </button>
            </div>
          )}

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
