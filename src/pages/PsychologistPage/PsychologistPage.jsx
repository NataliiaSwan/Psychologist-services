import PsychologistListCard from "../../components/PsychologistListCard/PsychologistListCard.jsx";
import css from "./PsychologistPage.module.css";
import { motion } from "framer-motion";

const PsychologistsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Початковий стан
      animate={{ opacity: 1, y: 0 }} // Анімований стан
      exit={{ opacity: 0, y: -20 }} // Вихідна анімація
      transition={{ duration: 0.5 }} // Тривалість анімації
    >
      <div className={css.psychologistPageContainer}>
        <PsychologistListCard />
      </div>
    </motion.div>
  );
};

export default PsychologistsPage;
