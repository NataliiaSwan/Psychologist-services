import logo from "../../assets/images/Logo.svg";
import css from "./Header.module.css";
import { useLocation } from "react-router-dom";
import NavItem from "../../components/NavItem/NavItem.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import UserIcon from "../../assets/icons/user.svg";

const Header = ({ onLogin, onRegister, onLogout }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isAuthenticated = !!user;

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

            {/* {location.pathname === "/psychologists" ||
            location.pathname === "/favorites" ? (
              <NavItem
                to="/favorites"
                label="Favorites"
                currentPath={location.pathname}
              />
            ) : null} */}
            {/* <NavItem
              to="/favorites"
              label="Favorites"
              currentPath={location.pathname}
            /> */}
            <NavItem
              to="/favorites"
              label="Favorites"
              currentPath={location.pathname}
              hidden={
                location.pathname !== "/psychologists" &&
                location.pathname !== "/favorites"
              }
            />
          </nav>
        </div>

        {isAuthenticated ? (
          <div className={css.userSection}>
            <div className={css.userBox}>
              <div className={css.iconContainer}>
                <img src={UserIcon} alt="User Icon" className={css.userIcon} />
              </div>
              <span className={css.userName}>
                {user?.displayName
                  ? user.displayName.split(" ")[0]
                  : user?.email?.split("@")[0] || "User"}{" "}
              </span>
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
