// import { useEffect, useState, useRef } from "react";
// import { fetchPsychologists } from "../../services/psychologistService.js";
// import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
// import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
// import css from "./PsychologistListCard.module.css";

// const PsychologistListCard = () => {
//   const [psychologists, setPsychologists] = useState([]);
//   const [filteredPsychologists, setFilteredPsychologists] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filter, setFilter] = useState("ALL");
//   const [visibleCount, setVisibleCount] = useState(3);

//   const filterRef = useRef(null); // 👉 для кліку поза фільтром

//   const filterLabels = {
//     ALL: "Show All",
//     A_TO_Z: "A to Z",
//     Z_TO_A: "Z to A",
//     PRICE_LOW: "Less than 10$",
//     PRICE_HIGH: "Greater than 10$",
//     POPULAR: "Popular",
//     NOT_POPULAR: "Not Popular",
//   };

//   useEffect(() => {
//     fetchPsychologists()
//       .then((data) => {
//         // Додаємо id до кожного психолога
//         const psychologistsWithId = data.map((item, index) => ({
//           ...item,
//           id: index + 1, // id — це порядковий номер елемента
//         }));

//         setPsychologists(psychologistsWithId);
//         setFilteredPsychologists(psychologistsWithId); // показує всіх при завантаженні
//       })
//       .catch((error) => console.error("Error fetching psychologists:", error));
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (filterRef.current && !filterRef.current.contains(e.target)) {
//         setIsFilterOpen(false);
//       }
//     };

//     if (isFilterOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isFilterOpen]);

//   const toggleFilter = () => {
//     setIsFilterOpen((prev) => !prev);
//   };

//   const handleFilterChange = (selectedFilter) => {
//     setFilter(selectedFilter);
//     setIsFilterOpen(false); // закрити фільтр після вибору
//     setVisibleCount(3); // обнуляємо видимість до перших 3 після нового фільтру

//     let filtered = [...psychologists];

//     switch (selectedFilter) {
//       case "A_TO_Z":
//         filtered.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case "Z_TO_A":
//         filtered.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       case "PRICE_LOW":
//         filtered = filtered.filter((p) => p.price_per_hour < 10);
//         break;
//       case "PRICE_HIGH":
//         filtered = filtered.filter((p) => p.price_per_hour >= 10);
//         break;
//       case "POPULAR":
//         filtered = filtered.filter((p) => p.rating >= 4);
//         break;
//       case "NOT_POPULAR":
//         filtered = filtered.filter((p) => p.rating < 4);
//         break;
//       default:
//         filtered = [...psychologists];
//     }

//     setFilteredPsychologists(filtered);
//   };

//   const loadMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   };

//   return (
//     <div>
//       <div>
//         <h1 className={css.filterTitle}>Filter</h1>
//         <button className={css.filterToggleButton} onClick={toggleFilter}>
//           {filterLabels[filter]}
//         </button>

//         {isFilterOpen && (
//           <div ref={filterRef} className={css.filterWrapper}>
//             <FilterComponent onFilterChange={handleFilterChange} />
//           </div>
//         )}
//       </div>

//       <div className={css.psychologistListContainer}>
//         {filteredPsychologists.slice(0, visibleCount).map((psychologist) => (
//           <PsychologistCard key={psychologist.id} {...psychologist} />
//         ))}
//       </div>

//       {visibleCount < filteredPsychologists.length && (
//         <button className={css.loadMoreButton} onClick={loadMore}>
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default PsychologistListCard;

import { useEffect, useState, useRef, useMemo } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
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

const applyFilter = (list, selectedFilter) => {
  switch (selectedFilter) {
    case "A_TO_Z":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "Z_TO_A":
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    case "PRICE_LOW":
      return list.filter((p) => p.price_per_hour < 10);
    case "PRICE_HIGH":
      return list.filter((p) => p.price_per_hour >= 10);
    case "POPULAR":
      return list.filter((p) => p.rating >= 4);
    case "NOT_POPULAR":
      return list.filter((p) => p.rating < 4);
    default:
      return list;
  }
};

const PsychologistListCard = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetchPsychologists()
      .then((data) => {
        const psychologistsWithId = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setPsychologists(psychologistsWithId);
        setFilteredPsychologists(psychologistsWithId);
      })
      .catch((error) => console.error("Error fetching psychologists:", error))
      .finally(() => setIsLoading(false));
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

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setVisibleCount(3);
    const filtered = applyFilter(psychologists, selectedFilter);
    setFilteredPsychologists(filtered);
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
      <button
        className={css.filterToggleButton}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {filterLabels[filter]}
      </button>

      {isFilterOpen && (
        <div ref={filterRef} className={css.filterWrapper}>
          <FilterComponent
            onFilterChange={handleFilterChange}
            selectedFilter={filter}
          />
        </div>
      )}

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
            <button className={css.loadMoreButton} onClick={loadMore}>
              Load More
            </button>
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
