import css from "./CardHeader.module.css";
import sprite from "../../assets/icons/sprite.svg";
import ButtonFavorite from "../../components/ButtonFavorite/ButtonFavorite.jsx";

const CardHeader = ({ rating, price_per_hour, isFav, onToggleFavorite }) => (
  <div className={css.cardHeader}>
    <p className={css.psychologistInfo}>psychologist</p>
    <ul className={css.listRatingPrice}>
      <li className={css.rating}>
        <svg className={css.iconStar}>
          <use href={`${sprite}#icon-star`} />
        </svg>
        Rating: <span>{rating}</span>
      </li>
      <li className={css.price}>
        Price 1 / hour:{" "}
        <span className={css.pricePerHour}>{price_per_hour}</span>
      </li>
      <li>
        <ButtonFavorite isFav={isFav} onToggle={onToggleFavorite} />
      </li>
    </ul>
  </div>
);

export default CardHeader;
