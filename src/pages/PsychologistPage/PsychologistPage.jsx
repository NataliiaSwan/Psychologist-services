import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";

const PsychologistsPage = () => {
  return (
    <div className={css.container}>
      <PsychologistListCard />
    </div>
  );
};

export default PsychologistsPage;
