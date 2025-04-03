import css from "./HeroSection.module.css";
import image from "../../assets/images/image.jpg";
import ExperiencedCheckbox from "../../components/ExperiencedCheckbox/ExperiencedCheckbox.jsx";
import SquareIcon from "../../components/SquareIcon/SquareIcon.jsx";
import sprite from "../../assets/icons/sprite.svg";

const HeroSection = ({ onGetStarted }) => {
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
        <button className={css.button} onClick={onGetStarted}>
          Get started
          <svg className={css.iconArrow}>
            <use href={`${sprite}#icon-arrow`} />
          </svg>
        </button>
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

// import css from "./HeroSection.module.css";
// import image from "../../assets/images/image.jpg";
// import ExperiencedCheckbox from "../../components/ExperiencedCheckbox/ExperiencedCheckbox.jsx";
// import SquareIcon from "../../components/SquareIcon/SquareIcon.jsx";
// import { useState, useEffect } from "react";
// import { usePsychologistContext } from "../../context/PsychologistContext.jsx";

// const HeroSection = ({ onGetStarted }) => {
//   const { psychologists, setPsychologists } = usePsychologistContext(); // Доступ до контексту
//   const [experiencedCount, setExperiencedCount] = useState(0);

//   useEffect(() => {
//     if (!psychologists) return; // Перевіряємо, чи є психологи
//     const count = psychologists.filter(
//       (psychologist) => psychologist.experience >= 5
//     ).length;
//     setExperiencedCount(count);
//   }, [psychologists]);

//   const handleFilterChange = (filteredPsychologists) => {
//     setPsychologists(filteredPsychologists);

//     const count = filteredPsychologists?.filter(
//       (psychologist) => psychologist.experience >= 5
//     ).length;
//     setExperiencedCount(count);
//   };

//   return (
//     <div className={css.heroSection}>
//       <div className={css.container}>
//         <h1 className={css.heroTitle}>
//           The road to the <span className={css.accent}>depths</span> of the
//           human soul
//         </h1>
//         <p className={css.heroPage}>
//           We help you to reveal your potential, overcome challenges and find a
//           guide in your own life with the help of our experienced psychologists.
//         </p>
//         <button className={css.button} onClick={onGetStarted}>
//           Get started
//         </button>
//       </div>

//       {psychologists && (
//         <ExperiencedCheckbox
//           psychologists={psychologists}
//           onFilterChange={handleFilterChange}
//           experiencedCount={experiencedCount}
//         />
//       )}

//       <SquareIcon />
//       <img
//         src={image}
//         className={css.heroImages}
//         alt="girl-manager"
//         width="464"
//         height="526"
//       />
//     </div>
//   );
// };

// export default HeroSection;
