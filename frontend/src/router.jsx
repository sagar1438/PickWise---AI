import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FindModel from "./pages/FindModel";
import Recommendations from "./pages/Recommendations";
import Discover from "./pages/Discover";
import Trending from "./pages/Trending";
import NewReleases from "./pages/NewReleases";
import Compare from "./pages/Compare";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "find-model",
        element: <FindModel />,
      },
      {
        path: "recommendations",
        element: <Recommendations />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "releases",
        element: <NewReleases />,
      },
      {
        path: "compare",
        element: <Compare />,
      },
    ],
  },
]);

export default router;