import { Outlet } from "react-router-dom";
import AnimatedShaderBackground from "./components/AnimatedShaderBackground";

function App() {
  return (
    <div className="app">
      <AnimatedShaderBackground />

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;