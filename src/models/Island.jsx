import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import sciFiPedestalScene from "../assets/3d/new.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes } = useGLTF(sciFiPedestalScene); // Changed to only get 'nodes'
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    lastX.current = event.clientX;
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const delta = (event.clientX - lastX.current) / viewport.width;
      rotationSpeed.current = delta * 0.01 * Math.PI;
      lastX.current = event.clientX;
    }
  };

  const handlePointerUp = () => {
    setIsRotating(false);
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  useFrame(() => {
    if (isRotating) {
      islandRef.current.rotation.y += rotationSpeed.current;
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <group {...props} dispose={null} ref={islandRef}>
      <group name="Scene">
        <group
          name="Cloud_Polygon_Blender_1001"
          rotation={[-Math.PI, 0.903, -Math.PI]}
          scale={21.481}
        >
          {Object.keys(nodes).map((nodeName) => (
            <mesh
              key={nodeName}
              name={nodeName}
              castShadow
              receiveShadow
              geometry={nodes[nodeName].geometry}
              material={nodes[nodeName].material}
            />
          ))}
        </group>
      </group>
    </group>
  );
}
