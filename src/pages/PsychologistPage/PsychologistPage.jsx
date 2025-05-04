import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";
import { motion } from "framer-motion";

const PsychologistsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={css.psychologistPageContainer}>
        <PsychologistListCard />
      </div>
    </motion.div>
  );
};

export default PsychologistsPage;
