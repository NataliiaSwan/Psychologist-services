import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Layout = ({ onLoginOpen, onRegisterOpen, user, onLogout }) => {
  return (
    <>
      <Header
        isAuthenticated={!!user}
        userName={user?.name || "User"}
        onLogin={onLoginOpen}
        onLogout={onLogout}
        onRegister={onRegisterOpen}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
