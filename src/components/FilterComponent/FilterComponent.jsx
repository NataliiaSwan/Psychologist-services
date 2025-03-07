import css from "../../components/FilterComponent/FilterComponent.module.css";

const FilterComponent = () => {
  return (
    <div className={css.filterContainer}>
      <h1 className={css.filterTitle}>Filter</h1>
      <button className={css.button}>A to Z</button>
      <div className={css.boxfilter}>
        <ul className={css.filterList}>
          <li>A to Z</li>
          <li>Z to A</li>
          <li>Less than 10$</li>
          <li>Greater than 10$</li>
          <li>Popular</li>
          <li>Not popular</li>
          <li>Show all</li>
        </ul>
      </div>
    </div>
  );
};
export default FilterComponent;
