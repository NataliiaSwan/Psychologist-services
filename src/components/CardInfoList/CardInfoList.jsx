import css from "./CardInfoList.module.css";

const CardInfoList = ({
  experience,
  license,
  specialization,
  initial_consultation,
}) => (
  <ul className={css.infoPcychologistList}>
    <li className={css.experience}>
      Experience: <span>{experience} years</span>
    </li>
    <li className={css.license}>
      License: <span>{license}</span>
    </li>
    <li className={css.specialization}>
      Specialization: <span>{specialization}</span>
    </li>
    <li className={css.initialConsultation}>
      Initial consultation: <span>{initial_consultation}</span>
    </li>
  </ul>
);

export default CardInfoList;
