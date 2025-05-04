import clsx from "clsx";
import sprite from "../../assets/icons/sprite.svg";
import css from "./FilterToggleButton.module.css";

const FilterToggleButton = ({
  currentFilter,
  isOpen,
  onClick,
  filterLabels,
}) => {
  return (
    <button
      className={css.filterToggleButton}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle filter options"
    >
      {filterLabels[currentFilter]}

      <svg
        className={clsx(css.iconVectorBottom, {
          [css.iconVectorTop]: isOpen,
        })}
        width="16"
        height="16"
      >
        <use href={`${sprite}#icon-vector-bottom`} />
      </svg>
    </button>
  );
};

export default FilterToggleButton;
