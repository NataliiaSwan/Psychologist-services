import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegisterModal.module.css";
// import sprite from "../../assets/icons/sprite.svg";

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

          <div className={css.passwordBox}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={css.passwordInput}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.passwordToggle}
            >
              {isPasswordVisible ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a18.24 18.24 0 013.06-3.94M1 1l22 22" />
                  <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <p className={css.error}>{errors.password?.message}</p>

          <button className={css.buttonSignIn} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
