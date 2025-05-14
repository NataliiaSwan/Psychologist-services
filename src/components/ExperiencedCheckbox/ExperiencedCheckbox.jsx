import css from "./ExperiencedCheckbox.module.css";

const ExperiencedCheckbox = ({
  checked,
  onCheckboxChange,
  experiencedCount,
}) => {
  const handleChange = (e) => {
    const checked = e.target.checked;
    onCheckboxChange(checked);

    const params = new URLSearchParams(window.location.search);
    if (checked) {
      params.set("experienced", "true");
    } else {
      params.delete("experienced");
    }
    window.history.pushState(null, "", "?" + params.toString());
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
          <span className={css.count}>{experiencedCount}</span>
        </div>
      </label>
    </div>
  );
};
export default ExperiencedCheckbox;
