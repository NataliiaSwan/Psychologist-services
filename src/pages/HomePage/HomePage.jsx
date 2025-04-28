import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = ({ user, setIsRegisterOpen, setIsLoginOpen }) => {
  const navigate = useNavigate();

  const handleGetStarted = (isExperiencedChecked) => {
    if (user) {
      navigate(`/psychologists?experienced=${isExperiencedChecked}`);
    } else if (localStorage.getItem("isRegistered")) {
      setIsLoginOpen(true);
    } else {
      setIsRegisterOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css.pageContainer}>
        <HeroSection onGetStarted={handleGetStarted} />
      </div>
    </motion.div>
  );
};

export default HomePage;
