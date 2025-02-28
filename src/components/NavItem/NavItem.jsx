import css from "./NavItem.module.css";
import { Link } from "react-router-dom";

const NavItem = ({ to, label, currentPath }) => {
  return (
    <div className={css.navItem}>
      <Link to={to} className={currentPath === to ? css.activeLink : ""}>
        {label}
      </Link>
      {currentPath === to && <div className={css.circle}></div>}
    </div>
  );
};

export default NavItem;
