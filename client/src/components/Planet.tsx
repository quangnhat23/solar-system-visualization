import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { PlanetData } from "../data/planetData";
import { useSolarSystem } from "../lib/stores/useSolarSystem";

interface PlanetProps {
  planetData: PlanetData;
  showOrbit: boolean;
}

export default function Planet({ planetData, showOrbit }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { selectPlanet, selectedPlanet, timeScale, isPaused, showLabels } = useSolarSystem();
  
  const isSelected = selectedPlanet?.name === planetData.name;

  useFrame((state, delta) => {
    if (!isPaused && groupRef.current) {
      // Orbital motion
      groupRef.current.rotation.y += delta * planetData.speed * timeScale;
    }
    
    if (planetRef.current) {
      // Planet rotation
      planetRef.current.rotation.y += delta * 0.5 * timeScale;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    selectPlanet(isSelected ? null : planetData);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group ref={groupRef}>
      <group position={[planetData.distance, 0, 0]}>
        {/* Planet sphere */}
        <mesh
          ref={planetRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={hovered || isSelected ? 1.2 : 1}
        >
          <sphereGeometry args={[planetData.radius, 32, 32]} />
          <meshLambertMaterial
            color={planetData.color}
            emissive={isSelected ? planetData.color : "#000000"}
            emissiveIntensity={isSelected ? 0.2 : 0}
          />
        </mesh>
        
        {/* Selection ring */}
        {isSelected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planetData.radius + 0.3, planetData.radius + 0.5, 32]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {/* Planet label */}
        {(showLabels || hovered || isSelected) && (
          <Text
            position={[0, planetData.radius + 1, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.1}
            outlineColor="black"
          >
            {planetData.name}
          </Text>
        )}
        
        {/* Special rings for Saturn */}
        {planetData.name === "Saturn" && (
          <>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planetData.radius + 0.5, planetData.radius + 1.2, 64]} />
              <meshLambertMaterial
                color="#CCCCCC"
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planetData.radius + 1.3, planetData.radius + 1.8, 64]} />
              <meshLambertMaterial
                color="#AAAAAA"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}
