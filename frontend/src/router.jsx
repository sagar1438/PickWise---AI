import { createBrowserRouter, Link } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FindModel from "./pages/FindModel";
import Recommendations from "./pages/Recommendations";
import Discover from "./pages/Discover";
import Trending from "./pages/Trending";
import NewReleases from "./pages/NewReleases";
import Compare from "./pages/Compare";
import ModelDetails from "./pages/ModelDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function NotFound() {
  return (
    <div className="page">
      <Navbar />

      <main className="page__container">
        <section className="model-details__not-found">
          <p className="section__eyebrow">404 ERROR</p>
          <h1 className="model-details__title">Page not found.</h1>
          <p className="model-details__description">
            This page doesn't exist. Explore the AI model catalog instead.
          </p>
          <Link to="/discover" className="navbar__cta">
            Explore models
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-model", element: <FindModel /> },
      { path: "recommendations", element: <Recommendations /> },
      { path: "discover", element: <Discover /> },
      { path: "trending", element: <Trending /> },
      { path: "releases", element: <NewReleases /> },
      { path: "compare", element: <Compare /> },
      { path: "models/:id", element: <ModelDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;