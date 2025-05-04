import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";

const HomePage = ({ user, setIsRegisterOpen, setIsLoginOpen }) => {
  const navigate = useNavigate();

  const handleGetStarted = (isExperiencedChecked) => {
    const isRegistered = localStorage.getItem("isRegistered") === "true";

    if (user) {
      // Якщо користувач авторизований — переходимо до списку психологів
      navigate(`/psychologists?experienced=${isExperiencedChecked}`);
      return;
    }

    if (isRegistered) {
      // Якщо користувач вже реєструвався раніше — відкриваємо логін
      setIsLoginOpen(true);
      return;
    }

    // Якщо користувач не зареєстрований — відкриваємо форму реєстрації
    setIsRegisterOpen(true);
  };

  return (
    <PageTransition>
      <div className={css.pageContainer}>
        <HeroSection onGetStarted={handleGetStarted} />
      </div>
    </PageTransition>
  );
};

export default HomePage;
