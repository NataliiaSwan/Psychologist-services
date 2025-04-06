import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegisterModal.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup
    .string()
    .email("Incorrect format email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "The password must be at least 6 characters long")
    .required("Password required"),
});

const RegisterModal = ({ onClose, onRegister }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 className={css.modalTitle}>Registration</h2>
        <p className={css.modalText}>
          Please provide your details to register.
        </p>

        <form onSubmit={handleSubmit(onRegister)}>
          <input type="text" placeholder="Name" {...register("name")} />
          <p className={css.error}>{errors.name?.message}</p>

          <input type="email" placeholder="Email" {...register("email")} />
          <p className={css.error}>{errors.email?.message}</p>

          {/* <input
            type="password"
            placeholder="Password"
            {...register("password")}
          /> */}
          <input
            type={isPasswordVisible ? "text" : "password"} // змінюємо тип
            placeholder="Password"
            {...register("password")}
          />
          {/* <svg className="icon">
            <use href={`${sprite}#icon-line`} />
          </svg>

          <svg className="icon">
            <use href={`${sprite}#icon-rossed-eye`} />
          </svg>
          <p className={css.error}>{errors.password?.message}</p> */}
          <button type="button" onClick={togglePasswordVisibility}>
            <svg className="icon">
              <use href={`${sprite}#icon-eye`} />
            </svg>
            {isPasswordVisible && (
              <svg className="icon">
                <use href={`${sprite}#icon-crossed-eye`} />
              </svg>
            )}
          </button>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
