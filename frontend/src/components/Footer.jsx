import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            PickWise
          </Link>

          <p>Find the right AI model for your project.</p>
        </div>

        <nav className="footer__links">
          <Link to="/discover">Discover</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/releases">New Releases</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/find-model">Find My Model</Link>
        </nav>
      </div>

      <div className="footer__bottom">
        <p>© 2026 PickWise - AI</p>
      </div>
    </footer>
  );
}

export default Footer; 