import { useState } from "react";
import css from "./LoginModal.module.css";

const Loginmodal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContainer}>
        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={css.closeButton} onClick={onClose}>
            ×
          </button>

          <h1 className={css.modalTitle}>Log In</h1>
          <p className={css.modalText}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Loginmodal;
