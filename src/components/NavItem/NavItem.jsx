import { Link, useMatch } from "react-router-dom";
import css from "./NavItem.module.css";

const NavItem = ({ to, label }) => {
  const match = useMatch(to);
  const isActive = !!match;

  return (
    <div className={css.navItem}>
      <Link
        to={to}
        className={isActive ? css.activeLink : css.inactiveLink}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
      {/** Circle indicator */}
      <div
        className={css.circle}
        style={{ visibility: isActive ? "visible" : "hidden" }}
      />
    </div>
  );
};

export default NavItem;
