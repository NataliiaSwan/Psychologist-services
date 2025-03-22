// import { useState } from "react";
// import css from "./RegisterModal.module.css";

// const RegisterModal = ({ onClose, onRegister }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     onRegister(name);
//   }

//   return (
//     <div className={css.modalOverlay} onClick={onClose}>
//       <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeButton} onClick={onClose}>
//           ×
//         </button>

//         <h2 className={css.modalTitle}>Registration</h2>
//         <p className={css.modalText}>
//           Thank you for your interest in our platform! In order to register, we
//           need some information. Please provide us with the following
//           information.
//         </p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterModal;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegisterModal.module.css";

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

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className={css.error}>{errors.password?.message}</p>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
