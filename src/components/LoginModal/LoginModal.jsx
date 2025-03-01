// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import css from "./LoginModal.module.css";

// const shema = yup.object().shape({
//   email: yup.string().email("Некоректний email").required("Обов'язкове поле"),
//   password: yup
//     .string()
//     .min(6, "Мінімум 6 символів")
//     .required("Обов'язкове поле"),
// });

// const Loginmodal = ({ onClose, onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     onLogin();
//   }

//   return (
//     <div className={css.modalOverlay} onClick={onClose}>
//       <div className={css.modalContainer}>
//         <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//           <button className={css.closeButton} onClick={onClose}>
//             ×
//           </button>

//           <h1 className={css.modalTitle}>Log In</h1>
//           <p className={css.modalText}>
//             Welcome back! Please enter your credentials to access your account
//             and continue your search for a psychologist.
//           </p>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">Log in</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Loginmodal;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginModal.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Невірний формат email")
    .required("Email обов’язковий"),
  password: yup
    .string()
    .min(6, "Пароль має містити щонайменше 6 символів")
    .required("Пароль обов’язковий"),
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
