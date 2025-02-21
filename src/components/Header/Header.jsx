import logo from "../../assets/images/Logo.svg";
import css from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = ({
  isAuthenticated,
  userName,
  onLogin,
  onLogout,
  onRegister,
}) => {
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
            <Link to="/">Home</Link>
            <Link to="/psychologists">Psychologists</Link>
            {isAuthenticated && <Link to="/favorites">Favorites</Link>}
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

// import logo from "../../assets/images/Logo.svg";
// import css from "./Header.module.css";
// import { Link } from "react-router-dom";

// const Header = ({
//   isAuthenticated,
//   userName,
//   onLogin,
//   onLogout,
//   onRegister,
// }) => {
//   return (
//     <>
//       <div
//         className={`${css.headerContainer} ${
//           isAuthenticated ? css.authHeader : css.guestHeader
//         }`}
//       >
//         <div className={css.headerBox}>
//           <img src={logo} alt="logo psychologists services" width="218" />
//           <nav className={css.navList}>
//             <Link to="/">Home</Link>
//             <Link to="/psychologists">Psychologists</Link>
//             {isAuthenticated && <Link to="/favorites">Favorites</Link>}
//           </nav>
//         </div>

//         {isAuthenticated ? (
//           <div className={css.userSection}>
//             <div className={css.userBox}>
//               <span className={css.userIcon}></span>
//               <span className={css.userName}>{userName}</span>
//             </div>
//             <button className={css.logoutButton} onClick={onLogout}>
//               Log out
//             </button>
//           </div>
//         ) : (
//           <div className={css.buttonBox}>
//             <button className={css.buttonLogin} onClick={onLogin}>
//               Log In
//             </button>
//             <button className={css.buttonRegistrator} onClick={onRegister}>
//               Registration
//             </button>
//           </div>
//         )}
//       </div>

//       <hr className={css.line} />
//     </>
//   );
// };

// export default Header;
