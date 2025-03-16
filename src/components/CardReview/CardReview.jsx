import css from "./CardReview.module.css";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal.jsx";
import { FaStar } from "react-icons/fa";

const CardReview = ({ name, avatar_url, reviewer, rating, comment }) => {
  return (
    <div className={css.reviewCard}>
      <div className={css.cardHeader}>
        <div className={css.reviewer}>
          {reviewer ? reviewer.charAt(0).toUpperCase() : "?"}
        </div>
        <h3 className={css.nameReviever}>{reviewer}</h3>
        <span>
          <FaStar color="#FFD700" size={16} style={{ marginRight: "4px" }} />{" "}
          {rating}
        </span>
      </div>
      <div className={css.comment}>
        <p>{comment}</p>
      </div>

      <AppointmentModal name={name} avatar_url={avatar_url} />
    </div>
  );
};

export default CardReview;
