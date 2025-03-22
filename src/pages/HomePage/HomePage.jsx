import HeroSection from "../../components/HeroSection/HeroSection.jsx";

import css from "./HomePage.module.css";

const HomePage = ({ onGetStarted }) => {
  return (
    <div className={css.pageContainer}>
      <HeroSection onGetStarted={onGetStarted} />
    </div>
  );
};
export default HomePage;
