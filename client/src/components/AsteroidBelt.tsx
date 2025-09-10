import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AsteroidBelt() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Pre-calculate asteroid positions
  const asteroidPositions = useMemo(() => {
    const positions = [];
    const count = 200;
    const minDistance = 26;
    const maxDistance = 30;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = (Math.random() - 0.5) * 2;
      const size = 0.05 + Math.random() * 0.1;
      
      positions.push({ x, y, z, size, angle, distance });
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {asteroidPositions.map((asteroid, index) => (
        <mesh key={index} position={[asteroid.x, asteroid.y, asteroid.z]}>
          <sphereGeometry args={[asteroid.size, 8, 8]} />
          <meshLambertMaterial color="#666666" />
        </mesh>
      ))}
    </group>
  );
}
