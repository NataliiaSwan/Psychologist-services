import css from "./PsychologistCard.module.css";

const PsychologistCard = ({
  avatar_url,
  name,
  rating,
  price_per_hour,
  experience,
  license,
  specialization,
  initial_consultation,
  description,
}) => {
  return (
    <div className={css.psychologistCardContainer}>
      <div className={css.avatarContainer}>
        <img src={avatar_url} alt={name} className={css.avatar} />
      </div>
      <div className={css.cardBox}>
        <div className={css.cardHeader}>
          <p className={css.psychologistInfo}>psychologist</p>
          <ul className={css.listRatingPrice}>
            <li className={css.rating}>
              Rating: <span>{rating}</span>
            </li>
            <li className={css.price}>
              Price 1 / hour: <span>{price_per_hour}</span>
            </li>
          </ul>
        </div>
        <h1 className={css.name}>{name}</h1>
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
          <li className={css.consultation}>
            Initial consultation: <span>{initial_consultation}</span>
          </li>
        </ul>
        <p className={css.description}>{description}</p>
        <button className={css.readMore}>Read more</button>
      </div>
    </div>
  );
};

export default PsychologistCard;
