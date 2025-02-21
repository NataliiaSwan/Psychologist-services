import css from "./HeroSection.module.css";
import image from "../../assets/images/image.jpg";

const HeroSection = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>
          The road to the <span className={css.accent}>depths</span> of the
          human soul
        </h1>
        <p className={css.page}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button className={css.button}>Get started</button>
      </div>
      <img
        src={image}
        className={css.images}
        alt="girl-manager"
        width="464"
        height="526"
      />
    </div>
  );
};
export default HeroSection;
