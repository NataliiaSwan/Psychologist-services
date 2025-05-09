import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

const PsychologistsPage = () => {
  return (
    <PageTransition>
      <div className={css.psychologistPageContainer}>
        <PsychologistListCard />
      </div>
    </PageTransition>
  );
};

export default PsychologistsPage;
