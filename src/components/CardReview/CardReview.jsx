import { useState } from "react";
import css from "./CardReview.module.css";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal.jsx";

const CardReview = ({ name, reiting, review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalopen] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const handleOpenModal = () => {
    setIsModalopen(true);
  };
  const handleCloseModal = () => {
    setIsModalopen(false);
  };
  return (
    <div className={css.reviewCard}>
      <div className={css.cardHeader}>
        <div className="avatar">{name.charAt(0).toUpperCase()}</div>
        <p>{name}</p>
        <span>Raiting: {reiting}</span>
      </div>
      {isExpanded && (
        <div className="review">
          <p>{review}</p>
        </div>
      )}
      <button onClick={handleReadMore}>
        {isExpanded ? "Read Less" : "Read More"}
      </button>
      <button onClick={handleOpenModal}>Make an appointment</button>
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        name={name}
      />
    </div>
  );
};
export default CardReview;
