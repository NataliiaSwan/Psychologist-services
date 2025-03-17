import css from "./PsychologistCard.module.css";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../services/firebaseFunctions.js";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import CardReview from "../../components/CardReview/CardReview.jsx";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal.jsx";

const PsychologistCard = ({
  id,
  avatar_url,
  name,
  rating,
  price_per_hour,
  experience,
  license,
  specialization,
  initial_consultation,
  about,
  reviews, // ⬅️ тут передаємо масив reviews
}) => {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user?.uid) {
      isFavorite(user.uid, id).then(setIsFav);
    }
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) return alert("Please log in to add to favorites.");

    try {
      if (isFav) {
        await removeFromFavorites(user.uid, id);
        setIsFav(false);
      } else {
        await addToFavorites(user.uid, {
          id,
          avatar_url,
          name,
          rating,
          price_per_hour,
          experience,
          license,
          specialization,
          initial_consultation,
          about,
          reviews, // ⬅️ зберігаємо reviews також
        });
        setIsFav(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className={css.psychologistCardContainer}>
      <div className={css.avatarContainer}>
        <img src={avatar_url} alt={name} className={css.avatar} />
      </div>
      <div className={css.cardBox}>
        <div className={css.cardHeader}>
          <p className={css.psychologistInfo}>psychologist</p>
          <ul className={css.listRatingPrice}>
            <li className={css.rating}>
              Rating: <span>{rating}</span>
            </li>
            <li className={css.price}>
              Price 1 / hour:{" "}
              <span className={css.pricePerHour}>{price_per_hour}</span>
            </li>
            <li>
              <button
                className={isFav ? css.heartActive : css.heart}
                onClick={toggleFavorite}
              >
                ❤️
              </button>
            </li>
          </ul>
        </div>
        <h1 className={css.name}>{name}</h1>
        <ul className={css.infoPcychologistList}>
          <li className={css.experience}>
            Experience: <span>{experience} years</span>
          </li>
          <li className={css.license}>
            License: <span>{license}</span>
          </li>
          <li className={css.specialization}>
            Specialization: <span>{specialization}</span>
          </li>
          <li className={css.initialConsultation}>
            Initial consultation: <span>{initial_consultation}</span>
          </li>
        </ul>
        <p className={css.about}>{about}</p>

        {!isExpanded && (
          <button className={css.readMore} onClick={handleToggleExpand}>
            Read More
          </button>
        )}

        {isExpanded && reviews && reviews.length > 0 && (
          <>
            {reviews.map((review, index) => (
              <CardReview
                key={index}
                name={name}
                avatar_url={avatar_url}
                reviewer={review.reviewer}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
            <button className={css.openModalButton} onClick={handleOpenModal}>
              Make an appointment
            </button>
            <AppointmentModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              name={name}
              avatar_url={avatar_url}
            />
          </>
        )}
      </div>
      <div className={css.reviewButtonWrapper}></div>
    </div>
  );
};

export default PsychologistCard;
