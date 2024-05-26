// components/Ball.tsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Ball: React.FC<any> = (props) => {
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default Ball;
