// import css from "./FavoritesFilter.module.css";

// const FavoritesFilter = ({ onFilterChange, selectedFilter }) => {
//   const filters = [
//     { key: "POPULAR", label: "Popular" },
//     { key: "NOT_POPULAR", label: "Not popular" },
//     { key: "ALL", label: "Show all" },
//   ];

//   return (
//     <div className={css.boxfilter}>
//       <ul className={css.filterList}>
//         {filters.map((filter) => (
//           <li
//             key={filter.key}
//             onClick={() => onFilterChange(filter.key)}
//             className={filter.key === selectedFilter ? css.active : ""}
//           >
//             {filter.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoritesFilter;

import css from "./FavoritesFilter.module.css";

const FavoritesFilter = ({ onFilterChange, selectedFilter }) => {
  const filters = [
    { key: "POPULAR", label: "Popular" },
    { key: "NOT_POPULAR", label: "Not popular" },
    { key: "ALL", label: "Show all" },
  ];

  return (
    <div className={css.boxfilter}>
      <ul className={css.filterList}>
        {filters.map((filter) => (
          <li
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={filter.key === selectedFilter ? css.active : ""}
          >
            {filter.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesFilter;
