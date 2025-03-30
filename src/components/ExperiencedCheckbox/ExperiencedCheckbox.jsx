// import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./ExperiencedCheckbox.module.css";
import { useState } from "react";

const ExperiencedCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={css.checkboxcontainer}>
      <label className={css.checkboxlabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className={css.checkbox}
        />
        <div className={css.customCheckbox}></div>
        <div className={css.textContainer}>
          <span className={css.text}>Experienced psychologists</span>
          <span className={css.count}>15,000</span>
        </div>
      </label>
    </div>
  );
};

export default ExperiencedCheckbox;

// import css from "./ExperiencedCheckbox.module.css";
// import { useState, useEffect } from "react";
// import { usePsychologistContext } from "../../context/PsychologistContext";

// const ExperiencedCheckbox = () => {
//   const [checked, setChecked] = useState(false);
//   const { psychologists, setPsychologists } = usePsychologistContext();
//   const [experiencedCount, setExperiencedCount] = useState(0);

//   useEffect(() => {
//     if (!psychologists) return; // Перевіряємо, чи є психологи

//     const count = psychologists.filter(
//       (psychologist) => psychologist.experience >= 5
//     ).length;
//     setExperiencedCount(count);
//   }, [psychologists]); // Оновлюємо лише, коли змінюється список психологів
//   console.log(psychologists);

//   const handleCheckboxChange = () => {
//     setChecked((prevChecked) => {
//       const nextChecked = !prevChecked;

//       // Фільтруємо психологів за досвідом більше 5 років
//       const filteredPsychologists = nextChecked
//         ? psychologists.filter((psychologist) => psychologist.experience >= 5)
//         : psychologists;

//       // Використовуємо useEffect, щоб уникнути оновлення стану під час рендеру
//       setTimeout(() => {
//         setPsychologists(filteredPsychologists);
//       }, 0);

//       return nextChecked;
//     });
//   };

//   return (
//     <div className={css.checkboxcontainer}>
//       <label className={css.checkboxlabel}>
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={handleCheckboxChange}
//           className={css.checkbox}
//         />
//         <div className={css.customCheckbox}></div>
//         <div className={css.textContainer}>
//           <span className={css.text}>Experienced psychologists</span>
//           <span className={css.count}>{experiencedCount}</span>
//         </div>
//       </label>
//     </div>
//   );
// };

// export default ExperiencedCheckbox;
