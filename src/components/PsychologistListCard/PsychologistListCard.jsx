import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import css from "./PsychologistListCard.module.css";
import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";

const PsychologistListCard = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    fetchPsychologists()
      .then((data) => {
        console.log("Fetched psychologists:", data);
        setPsychologists(data);
      })
      .catch((error) => console.error("Error fetching psychologists:", error));
  }, []);

  return (
    <div className={css.psychologistListContainer}>
      {psychologists.length > 0 ? (
        psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            avatar_url={psychologist.avatar_url}
            name={psychologist.name}
            rating={psychologist.rating}
            price_per_hour={psychologist.price_per_hour}
            experience={psychologist.experience}
            license={psychologist.license}
            specialization={psychologist.specialization}
            initial_consultation={psychologist.initial_consultation}
            description={psychologist.about}
          />
        ))
      ) : (
        <p>Loading psychologists...</p>
      )}
    </div>
  );
};

export default PsychologistListCard;
