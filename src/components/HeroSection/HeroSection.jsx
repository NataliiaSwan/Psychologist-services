import css from "./HeroSection.module.css";
import image from "../../assets/images/image.jpg";
import ExperiencedCheckbox from "../../components/ExperiencedCheckbox/ExperiencedCheckbox.jsx";
import SquareIcon from "../../components/SquareIcon/SquareIcon.jsx";
import sprite from "../../assets/icons/sprite.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ onGetStarted }) => {
  const [isExperiencedChecked, setIsExperiencedChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (checked) => {
    setIsExperiencedChecked(checked);
    navigate(`/?experienced=${checked}`);
  };

  const handleStart = () => {
    onGetStarted(isExperiencedChecked);
  };

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
        <button type="button" className={css.button} onClick={handleStart}>
          Get started
          <svg className={css.iconArrow}>
            <use href={`${sprite}#icon-arrow`} />
          </svg>
        </button>
      </div>

      <div className={css.heroImageWrapper}>
        <img
          src={image}
          className={css.heroImages}
          alt="Woman psychologist illustration"
        />
        <ExperiencedCheckbox
          checked={isExperiencedChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        <SquareIcon />
      </div>
    </div>
  );
};

export default HeroSection;
