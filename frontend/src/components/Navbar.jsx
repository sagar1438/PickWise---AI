import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/">
          <strong>PickWise</strong>
        </Link>

        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/trending">Trending</NavLink>
          <NavLink to="/releases">New Releases</NavLink>
        </div>

        <Link to="/find-model">
          Find My Model
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;