import css from "./PsychologistPage.module.css";
import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";

const PsychologistPage = () => {
  return (
    <div className={css.psychologistcontainer}>
      <PsychologistListCard />
    </div>
  );
};
export default PsychologistPage;
