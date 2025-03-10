// import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
// import css from "./PsychologistListCard.module.css";
// import { useEffect, useState } from "react";
// import { fetchPsychologists } from "../../services/psychologistService.js";
// import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";

// const PsychologistListCard = () => {
//   const [psychologists, setPsychologists] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   useEffect(() => {
//     fetchPsychologists()
//       .then((data) => {
//         setPsychologists(data);
//       })
//       .catch((error) => console.error("Error fetching psychologists:", error));
//   }, []);

//   const toggleFilter = () => {
//     setIsFilterOpen((prev) => !prev);
//   };

//   return (
//     <div className={css.psychologistListCard}>
//       <button className={css.filterToggleButton} onClick={toggleFilter}>
//         {isFilterOpen ? "Close Filter" : "Open Filter"}
//       </button>

//       <div className={css.psychologistListContainer}>
//         {isFilterOpen && (
//           <div className={css.filterWrapper}>
//             <FilterComponent />
//           </div>
//         )}

//         {psychologists.length > 0 ? (
//           psychologists.map((psychologist) => (
//             <PsychologistCard
//               key={psychologist.id}
//               avatar_url={psychologist.avatar_url}
//               name={psychologist.name}
//               rating={psychologist.rating}
//               price_per_hour={psychologist.price_per_hour}
//               experience={psychologist.experience}
//               license={psychologist.license}
//               specialization={psychologist.specialization}
//               initial_consultation={psychologist.initial_consultation}
//               description={psychologist.description}
//               id={psychologist.id}
//             />
//           ))
//         ) : (
//           <p>Loading psychologists...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PsychologistListCard;

// import { useEffect, useState } from "react";
// import css from "./PsychologistListCard.module.css";
// import PsychologistCard from "../PsychologistCard/PsychologistCard.jsx";
// import FilterComponent from "../FilterComponent/FilterComponent.jsx";
// import { fetchPsychologists } from "../../services/psychologistService.js";

// const PsychologistListCard = ({
//   showFilter = false,
//   enableLoadMore = false,
// }) => {
//   const [psychologists, setPsychologists] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [filter, setFilter] = useState("ALL");

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       const data = await fetchPsychologists();
//       setPsychologists(data);
//       setLoading(false);
//     };
//     getData();
//   }, []);

//   const toggleFilter = () => setIsFilterOpen((prev) => !prev);
//   const loadMore = () => setVisibleCount((prev) => prev + 3);

//   const applyFilter = (list) => {
//     switch (filter) {
//       case "A_TO_Z":
//         return [...list].sort((a, b) => a.name.localeCompare(b.name));
//       case "Z_TO_A":
//         return [...list].sort((a, b) => b.name.localeCompare(a.name));
//       case "PRICE_LOW":
//         return list.filter((p) => p.price_per_hour < 10);
//       case "PRICE_HIGH":
//         return list.filter((p) => p.price_per_hour >= 10);
//       case "POPULAR":
//         return [...list].sort((a, b) => b.rating - a.rating);
//       case "NOT_POPULAR":
//         return [...list].sort((a, b) => a.rating - b.rating);
//       case "ALL":
//       default:
//         return list;
//     }
//   };

//   const filteredList = applyFilter(psychologists);
//   const listToRender = enableLoadMore
//     ? filteredList.slice(0, visibleCount)
//     : filteredList;

//   return (
//     <div className={css.psychologistListCard}>
//       <h1 className={css.filterTitle}>Filter</h1>
//       {showFilter && (
//         <button className={css.filterToggleButton} onClick={toggleFilter}>
//           {isFilterOpen ? "Close Filter" : "Open Filter"}
//         </button>
//       )}

//       {isFilterOpen && showFilter && (
//         <div className={css.filterWrapper}>
//           <FilterComponent onFilterChange={setFilter} />
//         </div>
//       )}

//       <div className={css.psychologistListContainer}>
//         {loading ? (
//           <p>Loading psychologists...</p>
//         ) : listToRender.length > 0 ? (
//           listToRender.map((psychologist) => (
//             <PsychologistCard key={psychologist.id} {...psychologist} />
//           ))
//         ) : (
//           <p>No psychologists found for this filter.</p>
//         )}
//       </div>

//       {enableLoadMore && listToRender.length > visibleCount && (
//         <button className={css.loadMoreButton} onClick={loadMore}>
//           Load more
//         </button>
//       )}
//     </div>
//   );
// };

// export default PsychologistListCard;

import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterComponent from "../../components/FilterComponent/FilterComponent.jsx";
import css from "./PsychologistListCard.module.css";

const PsychologistListCard = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const filterLabels = {
    ALL: "Show All",
    A_TO_Z: "A to Z",
    Z_TO_A: "Z to A",
    PRICE_LOW: "Less than 10$",
    PRICE_HIGH: "Greater than 10$",
    POPULAR: "Popular",
    NOT_POPULAR: "Not Popular",
  };

  useEffect(() => {
    fetchPsychologists()
      .then((data) => {
        setPsychologists(data);
        setFilteredPsychologists(data); // показує всіх при завантаженні
      })
      .catch((error) => console.error("Error fetching psychologists:", error));
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsFilterOpen(false); // закрити фільтр після вибору

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
        filtered = filtered.filter((p) => p.rating >= 4); // приклад
        break;
      case "NOT_POPULAR":
        filtered = filtered.filter((p) => p.rating < 4);
        break;
      default:
        // Show all
        filtered = [...psychologists];
    }

    setFilteredPsychologists(filtered);
  };

  return (
    <div>
      <div className={css.filterBox}>
        <h1 className={css.filterTitle}>Filter</h1>
        <button className={css.filterToggleButton} onClick={toggleFilter}>
          {filterLabels[filter]}
        </button>

        {isFilterOpen && (
          <div className={css.filterWrapper}>
            <FilterComponent onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>
      <div className={css.psychologistListContainer}>
        {filteredPsychologists.length > 0 ? (
          filteredPsychologists.map((psychologist) => (
            <PsychologistCard key={psychologist.id} {...psychologist} />
          ))
        ) : (
          <p>No psychologists found.</p>
        )}
      </div>
    </div>
  );
};

export default PsychologistListCard;
