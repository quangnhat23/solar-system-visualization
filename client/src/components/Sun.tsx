import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const corona1Ref = useRef<THREE.Mesh>(null);
  const corona2Ref = useRef<THREE.Mesh>(null);
  const flareRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
    
    if (materialRef.current) {
      // Pulsing effect for the sun
      const pulse = Math.sin(time * 2) * 0.2 + 1.3;
      materialRef.current.emissiveIntensity = pulse;
    }

    // Animate corona layers
    if (corona1Ref.current) {
      corona1Ref.current.rotation.y += 0.002;
      corona1Ref.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
    
    if (corona2Ref.current) {
      corona2Ref.current.rotation.y -= 0.003;
      corona2Ref.current.rotation.x = Math.cos(time * 0.7) * 0.1;
    }

    // Animate solar flares
    if (flareRef.current) {
      flareRef.current.rotation.y += 0.01;
      const flareIntensity = Math.sin(time * 3) * 0.2 + 0.8;
      flareRef.current.scale.setScalar(2.8 + flareIntensity * 0.5);
    }
  });

  return (
    <group>
      {/* Main sun sphere with surface details */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#FFA500"
          emissive="#FFD700"
          emissiveIntensity={1.5}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Inner surface layer with darker spots */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF4500"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
          roughness={0.9}
        />
      </mesh>

      {/* Outer surface layer for texture */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#FFFF00"
          emissive="#FFFF00"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
          roughness={0.7}
        />
      </mesh>
      
      {/* Corona layer 1 */}
      <mesh ref={corona1Ref} scale={[2.2, 2.2, 2.2]}>
        <sphereGeometry args={[2, 24, 24]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Corona layer 2 */}
      <mesh ref={corona2Ref} scale={[2.6, 2.6, 2.6]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Solar flares/outer glow */}
      <mesh ref={flareRef} scale={[3.0, 3.0, 3.0]}>
        <sphereGeometry args={[2, 12, 12]} />
        <meshBasicMaterial
          color="#FFFF80"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Bright core highlight */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
