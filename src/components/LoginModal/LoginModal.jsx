// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import css from "./LoginModal.module.css";
// import { useState } from "react";

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Incorrect format email")
//     .required("Email mandatory"),
//   password: yup
//     .string()
//     .min(6, "The password must be at least 6 characters long")
//     .required("Password required"),
// });

// const LoginModal = ({ onClose, onLogin, redirectAfterLogin }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const handleLogin = async (data) => {
//     setIsSubmitting(true);
//     setLoginError(null);
//     try {
//       const result = await onLogin(data);
//       if (!result.success) {
//         setLoginError(result.message || "Something went wrong.");
//       } else {
//         if (redirectAfterLogin) {
//           window.location.href = redirectAfterLogin;
//         } else {
//           window.location.href = "/psychologists";
//         }
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       setLoginError("Unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={css.modalOverlay} onClick={handleClose}>
//       <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeButton} type="button" onClick={handleClose}>
//           ×
//         </button>
//         {loginError && <p className={css.error}>{loginError}</p>}
//         <h1 className={css.modalTitle}>Log In</h1>
//         <p className={css.modalText}>
//           Welcome back! Please enter your credentials.
//         </p>

//         <form onSubmit={handleSubmit(handleLogin)}>
//           <input
//             type="email"
//             autoFocus
//             placeholder="Email"
//             autoComplete="new-email"
//             {...register("email")}
//           />
//           <p className={css.error}>{errors.email?.message}</p>

//           <input
//             type="password"
//             placeholder="Password"
//             autoComplete="new-password"
//             {...register("password")}
//             required
//           />
//           <p className={css.error}>{errors.password?.message}</p>

//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Logging in..." : "Log in"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginModal.module.css";
import { useState } from "react";
import ReactDOM from "react-dom";

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

const LoginModal = ({ onClose, onLogin, redirectAfterLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    setLoginError(null);
    try {
      const result = await onLogin(data);
      if (!result.success) {
        setLoginError(result.message || "Something went wrong.");
      } else {
        window.location.href = redirectAfterLogin || "/psychologists";
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = (
    <div className={css.modalOverlay} onClick={handleClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} type="button" onClick={handleClose}>
          ×
        </button>
        {loginError && <p className={css.error}>{loginError}</p>}
        <h1 className={css.modalTitle}>Log In</h1>
        <p className={css.modalText}>
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            type="email"
            autoFocus
            placeholder="Email"
            autoComplete="new-email"
            {...register("email")}
          />
          <p className={css.error}>{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password")}
          />
          <p className={css.error}>{errors.password?.message}</p>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
};

export default LoginModal;
