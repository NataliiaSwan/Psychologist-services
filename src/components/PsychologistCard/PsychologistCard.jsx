import css from "./PsychologistCard.module.css";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../services/firebaseFunctions.js";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import CardReview from "../../components/CardReview/CardReview.jsx";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal.jsx";

import sprite from "../../assets/icons/sprite.svg";

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
  reviews,
  onRemoveFavorite,
}) => {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      isFavorite(user.uid, id).then(setIsFav);
    } else {
      const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFav(savedFavs.includes(id));
    }
  }, [user, id]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = async () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 2000);
      return;
    }

    try {
      const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isFav) {
        await removeFromFavorites(user.uid, id);
        setIsFav(false);
        const updatedFavs = savedFavs.filter((fav) => fav.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavs));

        if (onRemoveFavorite) {
          onRemoveFavorite(id);
        }
      } else {
        const newFavorite = {
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
          reviews,
        };
        await addToFavorites(user.uid, newFavorite);
        setIsFav(true);

        const updatedFavs = [...savedFavs, newFavorite];
        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className={css.psychologistCardContainer}>
      <div className={css.avatarContainer}>
        <img src={avatar_url} alt={name} className={css.avatar} />
        <div className={css.outerCircle}>
          <div className={css.innerCircle}></div>
        </div>
      </div>
      <div className={css.cardBox} onClick={handleToggleExpand}>
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
              <button className={css.heartButton} onClick={toggleFavorite}>
                <svg
                  className={`${css.iconHeart} ${
                    isFav ? css.iconHeartActive : ""
                  }`}
                >
                  <use href={`${sprite}#icon-heart`} />
                </svg>
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
          <button
            className={css.readMore}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleExpand();
            }}
          >
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
            <button
              className={css.openModalButton}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
            >
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

      {showLoginAlert && (
        <div className={css.loginAlert}>Please log in to use favorites 💚</div>
      )}
    </div>
  );
};

export default PsychologistCard;
