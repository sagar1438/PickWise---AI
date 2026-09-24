import { Outlet } from "react-router-dom";
import AnimatedShaderBackground from "./components/AnimatedShaderBackground";

function App() {
  return (
    <>
      <AnimatedShaderBackground />

      <div className="app-content">
        <Outlet />
      </div>
    </>
  );
}

export default App;