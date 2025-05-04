import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";

const Layout = ({ onLoginOpen, onRegisterOpen, user, onLogout }) => {
  return (
    <>
      <Header
        isAuthenticated={!!user}
        userName={user?.displayName || user?.email || ""}
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
