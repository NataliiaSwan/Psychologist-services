import logo from "../../assets/images/Logo.svg";
import css from "./Header.module.css";
import { useLocation } from "react-router-dom";
import NavItem from "../../components/NavItem/NavItem.jsx";

const Header = ({
  isAuthenticated,
  userName,
  onLogin,
  onLogout,
  onRegister,
}) => {
  const location = useLocation();
  return (
    <>
      <div
        className={`${css.headerContainer} ${
          isAuthenticated ? css.authHeader : css.guestHeader
        }`}
      >
        <div className={css.headerBox}>
          <img src={logo} alt="logo psychologists services" width="218" />
          <nav className={css.navList}>
            <NavItem to="/" label="Home" currentPath={location.pathname} />
            <NavItem
              to="/psychologists"
              label="Psychologists"
              currentPath={location.pathname}
            />

            <NavItem
              to="/favorites"
              label="Favorites"
              currentPath={location.pathname}
            />
          </nav>
        </div>

        {isAuthenticated ? (
          <div className={css.userSection}>
            <div className={css.userBox}>
              <span className={css.userIcon}></span>
              <span className={css.userName}>{userName}</span>
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

      <hr className={css.line} />
    </>
  );
};

export default Header;
