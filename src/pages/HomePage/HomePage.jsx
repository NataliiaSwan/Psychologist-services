import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition.jsx";
import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../services/psychologistService.js";

const HomePage = ({ user, setIsRegisterOpen, setIsLoginOpen }) => {
  const navigate = useNavigate();
  const [experiencedCount, setExperiencedCount] = useState(0);

  useEffect(() => {
    const loadExperiencedCount = async () => {
      try {
        const data = await fetchPsychologists();
        const experienced = data.filter((p) => parseInt(p.experience) >= 15);
        setExperiencedCount(experienced.length);
      } catch (error) {
        console.error("Error loading psychologists:", error);
      }
    };

    loadExperiencedCount();
  }, []);

  const handleGetStarted = (isExperiencedChecked) => {
    const isRegistered = localStorage.getItem("isRegistered") === "true";

    if (user) {
      navigate(`/psychologists?experienced=${isExperiencedChecked}`);
      return;
    }

    if (isRegistered) {
      setIsLoginOpen(true);
      return;
    }

    setIsRegisterOpen(true);
  };

  return (
    <PageTransition>
      <div className={css.homePageContainer}>
        <HeroSection
          onGetStarted={handleGetStarted}
          experiencedCount={experiencedCount}
          user={user}
          setIsLoginOpen={setIsLoginOpen}
          setIsRegisterOpen={setIsRegisterOpen}
        />
      </div>
    </PageTransition>
  );
};

export default HomePage;
