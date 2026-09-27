import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const getNavClass = ({ isActive }) =>
    `navbar__link ${isActive ? "active" : ""}`;

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <Link to="/" className="navbar__logo">
          PickWise
        </Link>

        <div className="navbar__links">
          <NavLink to="/" className={getNavClass} end>
            Home
          </NavLink>

          <NavLink to="/discover" className={getNavClass}>
            Discover
          </NavLink>

          <NavLink to="/trending" className={getNavClass}>
            Trending
          </NavLink>

          <NavLink to="/releases" className={getNavClass}>
            New Releases
          </NavLink>

          <NavLink to="/compare" className={getNavClass}>
            Compare
          </NavLink>
        </div>

        <Link to="/find-model" className="navbar__cta">
          Find My Model
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;