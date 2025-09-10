import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import SolarSystem from "./components/SolarSystem";
import PlanetInfo from "./components/PlanetInfo";
import GitHubPublisher from "./components/GitHubPublisher";

// Define control keys for camera navigation
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "up", keys: ["KeyQ"] },
  { name: "down", keys: ["KeyE"] },
  { name: "reset", keys: ["KeyR"] },
];

// Main App component
function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [0, 20, 50],
              fov: 60,
              near: 0.1,
              far: 2000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance"
            }}
          >
            <color attach="background" args={["#000000"]} />
            
            <Suspense fallback={null}>
              <SolarSystem />
            </Suspense>
          </Canvas>
          
          <PlanetInfo />
          <GitHubPublisher />
          
          {/* Controls overlay */}
          <div className="absolute top-4 left-4 z-10 bg-black/70 text-white p-4 rounded-lg text-sm">
            <h3 className="font-bold mb-2">Controls:</h3>
            <p>WASD / Arrow Keys: Move camera</p>
            <p>Q/E: Move up/down</p>
            <p>R: Reset camera</p>
            <p>Mouse: Look around</p>
            <p>Scroll: Zoom</p>
            <p>Click planets for info</p>
          </div>
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
