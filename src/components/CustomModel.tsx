// components/CustomModel.tsx
import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { easing } from "maath";

const CustomModel = ({
  position,
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  ...props
}) => {
  const obj = useLoader(OBJLoader, "/models/model.obj");
  const api = useRef();
  const ref = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );

    // Safely update the material color
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material.color) {
                easing.dampC(material.color, props.color, 0.2, delta);
              }
            });
          } else if (child.material.color) {
            easing.dampC(child.material.color, props.color, 0.2, delta);
          }
        }
      });
    }
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      {/* <BallCollider args={[1]} />
      <primitive object={obj} ref={ref} {...props} /> */}
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        <primitive object={obj} ref={ref} {...props} />
        <meshStandardMaterial {...props} />
      </mesh>
    </RigidBody>
  );
};

export default CustomModel;
