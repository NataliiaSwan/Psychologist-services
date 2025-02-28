// import { data } from "react-router-dom";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import css from "./PsychologistListCard.module.css";
import { useEffect, useState } from "react";

const PsychologistListCard = () => {
  const [psychologistCard, setPsychologistCard] = useState([]);

  useEffect(() => {
    fetch()
      .then((responce) => responce.json())
      .then((data) => setPsychologistCard(data))
      .catch((error) => console.error("Error fetching psychologists:", error));
  }, []);

  return (
    <div className={css.psychologistListContainer}>
      {psychologistCard.length > 0 ? (
        psychologistCard.map((psychologistCard) => (
          <PsychologistCard
            key={psychologistCard.id}
            avatar_url={psychologistCard.avatar_url}
            name={psychologistCard.name}
            rating={psychologistCard.rating}
            price={psychologistCard.price}
            experience={psychologistCard.experience}
            license={psychologistCard.license}
            specialization={psychologistCard.specialization}
            consultation={psychologistCard.consultation}
            description={psychologistCard.description}
          />
        ))
      ) : (
        <p>Loading psychologists</p>
      )}
    </div>
  );
};
export default PsychologistListCard;
