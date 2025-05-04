import css from "./PsychologistCard.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../context/FavoritesContext"; // 🆕 Додано

import CardHeader from "../../components/CardHeader/CardHeader.jsx";
import CardInfoList from "../../components/CardInfoList/CardInfoList.jsx";
import ReviewsListCard from "../../components/ReviewsListCard/ReviewsListCard.jsx";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

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
  const { isFavorite, addFavorite, removeFavorite } = useFavorites(); // 🆕
  const [isFav, setIsFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(id)); // 🆕 Перевірка з контексту
  }, [id, isFavorite]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 2000);
      return;
    }

    try {
      if (isFav) {
        await removeFavorite(id);
        onRemoveFavorite?.(id);
      } else {
        await addFavorite({
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
        });
      }

      setIsFav(!isFav);
    } catch (error) {
      console.error("Error toggling favorite:", error);
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

      <div className={css.cardBox} onClick={() => setIsExpanded(false)}>
        <CardHeader
          rating={rating}
          price_per_hour={price_per_hour}
          isFav={isFav}
          onToggleFavorite={toggleFavorite}
        />

        <h1 className={css.name}>{name}</h1>
        <CardInfoList
          experience={experience}
          license={license}
          specialization={specialization}
          initial_consultation={initial_consultation}
        />
        <p className={css.about}>{about}</p>

        {!isExpanded && (
          <button
            className={css.readMore}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            Read More
          </button>
        )}

        {isExpanded && reviews?.length > 0 && (
          <>
            <ReviewsListCard
              reviews={reviews}
              name={name}
              avatar_url={avatar_url}
            />
            <button
              className={css.openModalButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              Make an appointment
            </button>
            <AppointmentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
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
