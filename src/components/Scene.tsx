// components/Scene.tsx
"use client";
import React, { useReducer, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { GLTFLoader } from "three-stdlib";
import { easing } from "maath";
import { randInt } from "three/src/math/MathUtils.js";
import { Outline } from "@react-three/postprocessing";

import { EffectComposer, Noise } from "@react-three/postprocessing";
const accents = ["#ff8940", "#ffcc00", "#ffa6fe", "#FFFFFF"];
const shuffle = (accent = 0) => [
  { color: "#ffcc00", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: accents[accent], roughness: 1, accent: true },
  { color: accents[accent], roughness: 1, accent: true },
  { color: accents[accent], roughness: 1, accent: true },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  { color: "white", roughness: 1, metalness: 0 },
  {
    color: accents[accent],
    roughness: 1,
    accent: true,
    transparent: true,
    opacity: 0.5,
  },
  { color: accents[accent], roughness: 1, accent: true },
  { color: accents[accent], roughness: 1, accent: true },
];
const Scene: React.FC = () => {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);

  return (
    <Canvas
      flat
      shadows
      onClick={(e) => {
        e.stopPropagation();
        click();
      }}
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
    >
      <color attach="background" args={["#FFFFFF"]} />
      <ambientLight intensity={1} />
      <directionalLight
        intensity={1}
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>

      <Environment preset="city">
        <group rotation={[-Math.PI / 3, 0, 1]}>
          {/* <Lightformer
            form="circle"
            intensity={100}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          /> */}
          {/* <Lightformer
            form="ring"
            color="#4060ff"
            intensity={80}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 10, 0]}
            scale={10}
          /> */}
        </group>
      </Environment>
    </Canvas>
  );
};

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) =>
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    )
  );
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

const Sphere = ({
  position,
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  color = "white",
  ...props
}) => {
  const api = useRef();
  const ref = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  const obj = useLoader(GLTFLoader, "/models/cute_squid.glb");

  useMemo(() => {
    //let c = accents[randInt(0, accents.length - 1)];
    obj.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            material.roughness = 1.0;
            material.metalness = 0.0;
            material.color = new THREE.Color(color);
          });
        } else {
          child.material.color = new THREE.Color(color);
          child.material.roughness = 1.0;
          child.material.metalness = 0.0;
        }
      }
    });
  }, [obj, color]);

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );

    // Ensure materials can handle color changes
    /* if (ref.current) {
      ref.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material.color) {
                easing.dampC(material.color, color, 0.2, delta);
              }
            });
          } else if (child.material.color) {
            easing.dampC(child.material.color, color, 0.2, delta);
          }
        }
      });
    } */
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
      <BallCollider args={[1]} />
      <primitive
        object={obj.scene.clone()}
        scale={[0.5, 0.5, 0.5]}
        ref={ref}
        {...props}
      />
    </RigidBody>
  );
};

export default Scene;
