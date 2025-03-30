import HeroSection from "../../components/HeroSection/HeroSection.jsx";

import css from "./HomePage.module.css";

import { useNavigate } from "react-router-dom";

const HomePage = ({ user, setIsRegisterOpen }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/psychologists");
    } else {
      setIsRegisterOpen(true);
    }
  };

  return (
    <div className={css.pageContainer}>
      <HeroSection onGetStarted={handleGetStarted} />
    </div>
  );
};
export default HomePage;
