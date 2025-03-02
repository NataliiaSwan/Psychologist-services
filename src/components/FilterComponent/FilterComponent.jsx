import css from "../../components/FilterComponent/FilterComponent.module.css";

const FilterComponent = (onSort) => {
  return (
    <div>
      <p>Filter</p>
      <button className={css.buttonAZ}>A to Z</button>
      <div className={css.boxfilter}>
        <button onClick={() => ("name", "asc")}>A-Z</button>
        <button onClick={() => ("name", "desc")}>Z-A</button>
        <button onClick={() => onSort("price_per_hour", "asc")}>
          Less than 10$
        </button>
        <button onClick={() => onSort("price_per_hour", "desc")}>
          Greater than 10$
        </button>
        <button onClick={() => onSort("popular", "asc")}>Popular</button>
        <button onClick={() => onSort("popular", "asc")}>Not popular</button>
        <button onClick={() => onSort("all", "asc")}>Show all</button>
      </div>
    </div>
  );
};
export default FilterComponent;
