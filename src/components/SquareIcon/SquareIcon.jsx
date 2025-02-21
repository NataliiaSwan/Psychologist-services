import css from "./SquareIcon.module.css";

const SquareIcon = () => {
  return (
    <>
      <div className={css.iconboxViolet}>
        <span className={css.iconViolet}></span>
      </div>
      <div className={css.iconboxYellow}>
        <span className={css.iconYellow}></span>
      </div>
    </>
  );
};
export default SquareIcon;
