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
      <img src={avatar_url} alt={name} className={css.avatar} />
      <p className={css.type}>psychologist</p>
      <h1 className={css.name}>{name}</h1>
      <p className={css.rating}>
        Rating: <span>{rating}</span>
      </p>
      <p className={css.price}>
        Price 1 / hour: <span>{price_per_hour}</span>
      </p>
      <p className={css.experience}>
        Experience: <span>{experience} years</span>
      </p>
      <p className={css.license}>
        License: <span>{license}</span>
      </p>
      <p className={css.specialization}>
        Specialization: <span>{specialization}</span>
      </p>
      <p className={css.consultation}>
        Initial consultation: <span>{initial_consultation}</span>
      </p>
      <p className={css.description}>{description}</p>
      <button className={css.readMore}>Read more</button>
    </div>
  );
};

export default PsychologistCard;
