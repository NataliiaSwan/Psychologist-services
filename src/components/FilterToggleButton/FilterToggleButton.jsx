import sprite from "../../assets/icons/sprite.svg";
import css from "./FilterToggleButton.module.css";

const FilterToggleButton = ({
  currentFilter,
  isOpen,
  onClick,
  filterLabels,
}) => {
  return (
    <button className={css.filterToggleButton} onClick={onClick}>
      {filterLabels[currentFilter]}
      <svg
        className={`${css.iconVectorBottom} ${isOpen ? css.iconVectorTop : ""}`}
      >
        <use href={`${sprite}#icon-vector-bottom`} />
      </svg>
    </button>
  );
};

export default FilterToggleButton;
