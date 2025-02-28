import HeroSection from "../../components/HeroSection/HeroSection.jsx";

import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.pageContainer}>
      <HeroSection />
    </div>
  );
};
export default HomePage;
