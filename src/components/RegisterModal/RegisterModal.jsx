import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import css from "./RegisterModal.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup
    .string()
    .email("Incorrect email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "The password must be at least 6 characters long")
    .required("Password required"),
});

const RegisterModal = ({ onClose, onRegister }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSubmitForm = async (data) => {
    try {
      const result = await onRegister(data);
      if (!result.success) {
        setRegisterError(result.message || "Something went wrong.");
        return;
      }
      reset(); 
    } catch (error) {
      console.error(error);
      setRegisterError("Unexpected error occurred.");
    }
  };

  const handleClose = () => {
    reset(); 
    onClose();
  };

  return (
    <div className={css.modalOverlay} onClick={handleClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          ×
        </button>
        {registerError && <p className={css.error}>{registerError}</p>}
        <h2 className={css.modalTitle}>Registration</h2>
        <p className={css.modalText}>
          Please provide your details to register.
        </p>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <input
            type="text"
            autoFocus
            placeholder="Name"
            autoComplete="new-name"
            {...register("name")}
          />
          <p className={css.error}>{errors.name?.message}</p>

          <input
            type="email"
            placeholder="Email"
            autoComplete="new-email"
            {...register("email")}
          />
          <p className={css.error}>{errors.email?.message}</p>

          <div className={css.passwordBox}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
              className={css.passwordInput}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.passwordToggle}
            >
              {isPasswordVisible ? "Hide" : "Show"}
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
