import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import NavItem from "../../components/NavItem/NavItem.jsx";

import logo from "../../assets/images/Logo.svg";
import UserIcon from "../../assets/icons/user.svg";
import css from "./Header.module.css";

const Header = ({ onLogin, onRegister, onLogout }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;
  const currentPath = location.pathname;

  const renderUserName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <>
      <div
        className={`${css.headerContainer} ${
          isAuthenticated ? css.authHeader : css.guestHeader
        }`}
      >
        <div className={css.headerBox}>
          <img src={logo} alt="Psychologists Logo" width="218" />
          <nav className={css.navList}>
            <NavItem to="/" label="Home" currentPath={currentPath} />
            <NavItem
              to="/psychologists"
              label="Psychologists"
              currentPath={currentPath}
            />
            <NavItem
              to="/favorites"
              label="Favorites"
              currentPath={currentPath}
              hidden={!["/psychologists", "/favorites"].includes(currentPath)}
            />
          </nav>
        </div>

        {isAuthenticated ? (
          <div className={css.userSection}>
            <div className={css.userBox}>
              <div className={css.iconContainer}>
                <img src={UserIcon} alt="User Icon" className={css.userIcon} />
              </div>
              <span className={css.userName}>{renderUserName()}</span>
            </div>
            <button className={css.logoutButton} onClick={onLogout}>
              Log out
            </button>
          </div>
        ) : (
          <div className={css.buttonBox}>
            <button className={css.buttonLogin} onClick={onLogin}>
              Log In
            </button>
            <button className={css.buttonRegistrator} onClick={onRegister}>
              Registration
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
