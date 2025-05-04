import css from "./ButtonFavorite.module.css";
import sprite from "../../assets/icons/sprite.svg";
import clsx from "clsx";

const ButtonFavorite = ({ isFav, onToggle }) => (
  <button className={css.heartButton} onClick={onToggle}>
    <svg className={clsx(css.iconHeart, isFav && css.iconHeartActive)}>
      <use href={`${sprite}#icon-heart`} />
    </svg>
  </button>
);

export default ButtonFavorite;
