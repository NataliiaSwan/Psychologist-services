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
// import IconHeart from "../../assets/icons/heard.svg";

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
}) => {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // 🔔

  useEffect(() => {
    if (user?.uid) {
      isFavorite(user.uid, id).then(setIsFav);
    } else {
      const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFav(savedFavs.includes(id));
    }
  }, [user, id]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = async () => {
    if (!user) {
      // 🔔 якщо користувач не залогінений
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 2000);
      return;
    }

    try {
      const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isFav) {
        await removeFromFavorites(user.uid, id);
        setIsFav(false);
        // також прибрати з localStorage
        const updatedFavs = savedFavs.filter((fav) => fav.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
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
        // додати до localStorage
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
              {/* <button
                className={isFav ? css.iconHeartActive : css.iconHeart}
                onClick={toggleFavorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  className={isFav ? css.iconHeartActive : css.iconHeart}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button> */}
              <button className={css.heartButton} onClick={toggleFavorite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  className={css.iconHeart} // Клас тільки на svg
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    className={isFav ? css.iconHeartActive : ""}
                  />
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

      {/* 🔔 Пуш-сповіщення */}
      {showLoginAlert && (
        <div className={css.loginAlert}>Please log in to use favorites 💚</div>
      )}
    </div>
  );
};

export default PsychologistCard;
