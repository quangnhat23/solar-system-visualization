import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Sun from "./Sun";
import Planet from "./Planet";
import AsteroidBelt from "./AsteroidBelt";
import CameraControls from "./CameraControls";
import { planetData } from "../data/planetData";
import { useSolarSystem } from "../lib/stores/useSolarSystem";

export default function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const { timeScale, isPaused, showOrbits } = useSolarSystem();

  useFrame((state, delta) => {
    if (!isPaused && groupRef.current) {
      // Rotate the entire solar system slowly for a dynamic view
      groupRef.current.rotation.y += delta * 0.01 * timeScale;
    }
  });

  return (
    <>
      {/* Camera Controls */}
      <CameraControls />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={200}
        target={[0, 0, 0]}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        color="#FFF8DC"
        decay={0}
        distance={0}
      />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.5}
        color="#ffffff"
      />
      
      {/* Stars background */}
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={4}
        saturation={0}
        fade={true}
        speed={0.5}
      />
      
      <group ref={groupRef}>
        {/* Sun at the center */}
        <Sun />
        
        {/* Planets */}
        {planetData.map((planet, index) => (
          <Planet
            key={planet.name}
            planetData={planet}
            showOrbit={showOrbits}
          />
        ))}
        
        {/* Asteroid Belt between Mars and Jupiter */}
        <AsteroidBelt />
        
        {/* Orbital paths */}
        {showOrbits && planetData.map((planet) => (
          <mesh key={`orbit-${planet.name}`} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.distance - 0.1, planet.distance + 0.1, 64]} />
            <meshBasicMaterial
              color="#444444"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
