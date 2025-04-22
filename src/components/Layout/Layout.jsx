import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";

const Layout = ({ onLoginOpen, onRegisterOpen, user, onLogout }) => {
  const isAuthenticated = Boolean(user);
  const userName = user?.displayName || user?.email || "";

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogin={onLoginOpen}
        onLogout={onLogout}
        onRegister={onRegisterOpen}
      />
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
