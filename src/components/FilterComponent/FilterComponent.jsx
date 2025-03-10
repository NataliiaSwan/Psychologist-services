import css from "./FilterComponent.module.css";

const FilterComponent = ({ onFilterChange }) => {
  const filters = [
    { key: "A_TO_Z", label: "A to Z" },
    { key: "Z_TO_A", label: "Z to A" },
    { key: "PRICE_LOW", label: "Less than 10$" },
    { key: "PRICE_HIGH", label: "Greater than 10$" },
    { key: "POPULAR", label: "Popular" },
    { key: "NOT_POPULAR", label: "Not popular" },
    { key: "ALL", label: "Show all" },
  ];
  const handleFilterClick = (key) => {
    onFilterChange(key);
  };

  return (
    <>
      <div>
        <div className={css.boxfilter}>
          <ul className={css.filterList}>
            {filters.map((filter) => (
              <li
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
              >
                {filter.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
