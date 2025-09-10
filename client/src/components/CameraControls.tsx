import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

export default function CameraControls() {
  const { camera } = useThree();
  const [subscribe, getKeys] = useKeyboardControls();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const keys = getKeys();
    
    // Get camera's forward and right vectors
    camera.getWorldDirection(direction.current);
    const right = new THREE.Vector3().crossVectors(camera.up, direction.current).normalize();
    const forward = direction.current.clone().normalize();
    const up = camera.up.clone().normalize();

    // Apply movement based on keys
    const speed = 20;
    velocity.current.set(0, 0, 0);

    if (keys.forward) velocity.current.add(forward.multiplyScalar(speed * delta));
    if (keys.backward) velocity.current.add(forward.multiplyScalar(-speed * delta));
    if (keys.leftward) velocity.current.add(right.multiplyScalar(speed * delta));
    if (keys.rightward) velocity.current.add(right.multiplyScalar(-speed * delta));
    if (keys.up) velocity.current.add(up.multiplyScalar(speed * delta));
    if (keys.down) velocity.current.add(up.multiplyScalar(-speed * delta));

    // Apply velocity to camera position
    camera.position.add(velocity.current);

    // Reset camera position
    if (keys.reset) {
      camera.position.set(0, 20, 50);
      camera.lookAt(0, 0, 0);
    }
  });

  // Log key presses for debugging
  useEffect(() => {
    const unsubscribe = subscribe(
      (state) => state,
      (pressed) => {
        console.log("Camera controls:", pressed);
      }
    );
    return unsubscribe;
  }, [subscribe]);

  return null;
}
