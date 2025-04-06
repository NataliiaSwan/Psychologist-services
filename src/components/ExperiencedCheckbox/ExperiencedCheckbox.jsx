// import PsychologistCard from "../PsychologistCard/PsychologistCard";
// import css from "./ExperiencedCheckbox.module.css";
// import { useState } from "react";

// const ExperiencedCheckbox = () => {
//   const [checked, setChecked] = useState(false);
//   return (
//     <div className={css.checkboxcontainer}>
//       <label className={css.checkboxlabel}>
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={() => setChecked(!checked)}
//           className={css.checkbox}
//         />
//         <div className={css.customCheckbox}></div>
//         <div className={css.textContainer}>
//           <span className={css.text}>Experienced psychologists</span>
//           <span className={css.count}>15,000</span>
//         </div>
//       </label>
//     </div>
//   );
// };

// export default ExperiencedCheckbox;
import css from "./ExperiencedCheckbox.module.css";

const ExperiencedCheckbox = ({ checked, onCheckboxChange }) => {
  const handleChange = (e) => {
    onCheckboxChange(e.target.checked);
  };

  return (
    <div className={css.checkboxcontainer}>
      <label className={css.checkboxlabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
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
