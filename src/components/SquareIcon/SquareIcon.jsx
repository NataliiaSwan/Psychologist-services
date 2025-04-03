import css from "./SquareIcon.module.css";
import sprite from "../../assets/icons/sprite.svg";

const SquareIcon = () => {
  return (
    <>
      <div className={css.iconboxViolet}>
        <svg className={css.iconViolet}>
          <use href={`${sprite}#icon-question-mark`} />
        </svg>
      </div>
      <div className={css.iconboxYellow}>
        <svg className={css.iconYellow}>
          <use href={`${sprite}#icon-users`} />
        </svg>
      </div>
    </>
  );
};
export default SquareIcon;
