import css from "./HeroSection.module.css";
import image from "../../assets/images/image.jpg";

import ExperiencedCheckbox from "../../components/ExperiencedCheckbox/ExperiencedCheckbox.jsx";
import SquareIcon from "../../components/SquareIcon/SquareIcon.jsx";

const HeroSection = () => {
  return (
    <div className={css.heroSection}>
      <div className={css.container}>
        <h1 className={css.heroTitle}>
          The road to the <span className={css.accent}>depths</span> of the
          human soul
        </h1>
        <p className={css.heroPage}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button className={css.button}>Get started</button>
      </div>
      <ExperiencedCheckbox />
      <SquareIcon />
      <img
        src={image}
        className={css.heroImages}
        alt="girl-manager"
        width="464"
        height="526"
      />
    </div>
  );
};
export default HeroSection;
