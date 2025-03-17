import css from "./CardReview.module.css";
import { FaStar } from "react-icons/fa";

const CardReview = ({ reviewer, rating, comment }) => {
  return (
    <div className={css.reviewCard}>
      <div className={css.cardHeader}>
        <div className={css.reviewer}>
          {reviewer ? reviewer.charAt(0).toUpperCase() : "?"}
        </div>
        <div className={css.cardRating}>
          <h3 className={css.nameReviever}>{reviewer}</h3>
          <span>
            <FaStar color="#FFD700" size={16} style={{ marginRight: "4px" }} />{" "}
            {rating}
          </span>
        </div>
      </div>
      <p className={css.comment}>{comment}</p>
    </div>
  );
};

export default CardReview;
