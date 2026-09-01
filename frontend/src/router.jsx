import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FindModel from "./pages/FindModel";
import Recommendations from "./pages/Recommendations";

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
    ],
  },
]);

export default router;