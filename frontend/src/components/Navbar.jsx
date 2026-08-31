import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__container">
        <Link to="/" className="navbar__logo">
          PickWise
        </Link>

        <div className="navbar__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            Trending
          </NavLink>

          <NavLink
            to="/releases"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            New Releases
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