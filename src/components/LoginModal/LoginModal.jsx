import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginModal.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Incorrect format email")
    .required("Email mandatory"),
  password: yup
    .string()
    .min(6, "The password must be at least 6 characters long")
    .required("Password required"),
});

const LoginModal = ({ onClose, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>

        <h1 className={css.modalTitle}>Log In</h1>
        <p className={css.modalText}>
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit(onLogin)}>
          <input type="email" placeholder="Email" {...register("email")} />
          <p className={css.error}>{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className={css.error}>{errors.password?.message}</p>

          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
