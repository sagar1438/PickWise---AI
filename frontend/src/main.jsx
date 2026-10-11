import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/button.css";
import "./styles/cards.css";
import "./styles/forms.css";
import "./styles/navbar.css";
import "./styles/pages.css";
import "./styles/animations.css";
import "./styles/footer.css";
import "./styles/states.css";
import "./styles/shader-background.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);