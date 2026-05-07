import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { useControls } from "../hooks/useControls";
import * as THREE from "three";

export const Vehicle = ({ position = [0, 2, 0] }) => {
  const chassisBody = useRef();
  const wheels = [useRef(), useRef(), useRef(), useRef()];
  const controls = useControls();

  const wheelInfo = {
    radius: 0.5,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingFrictionForce: false,
    customSlidingFrictionForce: 0.6,
  };

  const wheelInfos = [
    { ...wheelInfo, chassisConnectionPointLocal: [-1.2, -0.2, 1.8], isFrontWheel: true },
    { ...wheelInfo, chassisConnectionPointLocal: [1.2, -0.2, 1.8], isFrontWheel: true },
    { ...wheelInfo, chassisConnectionPointLocal: [-1.2, -0.2, -1.8], isFrontWheel: false },
    { ...wheelInfo, chassisConnectionPointLocal: [1.2, -0.2, -1.8], isFrontWheel: false },
  ];

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels,
  }));

  useFrame((state) => {
    const { forward, backward, left, right } = controls;
    const force = 1500;
    const steer = 0.5;

    api.applyEngineForce(forward ? -force : backward ? force : 0, 2);
    api.applyEngineForce(forward ? -force : backward ? force : 0, 3);
    api.setSteeringValue(left ? steer : right ? -steer : 0, 0);
    api.setSteeringValue(left ? steer : right ? -steer : 0, 1);

    // Camera follow logic
    const chassisPosition = new THREE.Vector3();
    chassisPosition.setFromMatrixPosition(chassisBody.current.matrixWorld);

    const cameraOffset = new THREE.Vector3(0, 5, 12);
    cameraOffset.applyQuaternion(chassisBody.current.quaternion);
    
    state.camera.position.lerp(chassisPosition.clone().add(cameraOffset), 0.1);
    state.camera.lookAt(chassisPosition);
  });

  return (
    <group ref={vehicle}>
      {/* Chassis */}
      <mesh ref={chassisBody} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 5]} />
        <meshStandardMaterial color="#00f2ff" metalness={0.8} roughness={0.2} />
        {/* Cockpit */}
        <mesh position={[0, 0.6, -0.5]}>
           <boxGeometry args={[1.8, 0.8, 2]} />
           <meshStandardMaterial color="#111" transparent opacity={0.6} />
        </mesh>
      </mesh>

      {/* Wheels */}
      {wheels.map((ref, i) => (
        <mesh key={i} ref={ref} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      ))}
    </group>
  );
};
