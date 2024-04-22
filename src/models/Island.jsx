import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import sciFiPedestalScene from "../assets/3d/3jtj.glb"; // Updated import statement

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(sciFiPedestalScene); // Changed to include 'materials'
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
    <group ref={islandRef} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Text001"
          position={[-0.081, 2.674, -3.136]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.409}
        >
          <mesh
            name="Text001_1"
            castShadow
            receiveShadow
            geometry={nodes.Text001_1.geometry}
            material={materials['Material.013']}
          />
          <mesh
            name="Text001_2"
            castShadow
            receiveShadow
            geometry={nodes.Text001_2.geometry}
            material={materials['Material.026']}
          />
          <mesh
            name="Text001_3"
            castShadow
            receiveShadow
            geometry={nodes.Text001_3.geometry}
            material={materials['Material.022']}
          />
          <mesh
            name="Text001_4"
            castShadow
            receiveShadow
            geometry={nodes.Text001_4.geometry}
            material={materials['Material.021']}
          />
          <mesh
            name="Text001_5"
            castShadow
            receiveShadow
            geometry={nodes.Text001_5.geometry}
            material={materials['Material.025']}
          />
          <mesh
            name="Text001_6"
            castShadow
            receiveShadow
            geometry={nodes.Text001_6.geometry}
            material={materials.aiStandardSurface1}
          />
          <mesh
            name="Text001_7"
            castShadow
            receiveShadow
            geometry={nodes.Text001_7.geometry}
            material={materials['GOLD meterial']}
          />
          <mesh
            name="Text001_8"
            castShadow
            receiveShadow
            geometry={nodes.Text001_8.geometry}
            material={materials['Material.020']}
          />
          <mesh
            name="Text001_9"
            castShadow
            receiveShadow
            geometry={nodes.Text001_9.geometry}
            material={materials['Material.018']}
          />
          <mesh
            name="Text001_10"
            castShadow
            receiveShadow
            geometry={nodes.Text001_10.geometry}
            material={materials['Material.014']}
          />
          <mesh
            name="Text001_11"
            castShadow
            receiveShadow
            geometry={nodes.Text001_11.geometry}
            material={materials['Material.015']}
          />
          <mesh
            name="Text001_12"
            castShadow
            receiveShadow
            geometry={nodes.Text001_12.geometry}
            material={materials['Material.009']}
          />
          <mesh
            name="Text001_13"
            castShadow
            receiveShadow
            geometry={nodes.Text001_13.geometry}
            material={materials.lambert19}
          />
          <mesh
            name="Text001_14"
            castShadow
            receiveShadow
            geometry={nodes.Text001_14.geometry}
            material={materials.lambert25}
          />
          <mesh
            name="Text001_15"
            castShadow
            receiveShadow
            geometry={nodes.Text001_15.geometry}
            material={materials.lambert27}
          />
          <mesh
            name="Text001_16"
            castShadow
            receiveShadow
            geometry={nodes.Text001_16.geometry}
            material={materials.lambert14}
          />
          <mesh
            name="Text001_17"
            castShadow
            receiveShadow
            geometry={nodes.Text001_17.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Text001_18"
            castShadow
            receiveShadow
            geometry={nodes.Text001_18.geometry}
            material={materials['Material.006']}
          />
          <mesh
            name="Text001_19"
            castShadow
            receiveShadow
            geometry={nodes.Text001_19.geometry}
            material={materials['01_-_Default']}
          />
          <mesh
            name="Text001_20"
            castShadow
            receiveShadow
            geometry={nodes.Text001_20.geometry}
            material={materials['01_-_Default.001']}
          />
          <mesh
            name="Text001_21"
            castShadow
            receiveShadow
            geometry={nodes.Text001_21.geometry}
            material={materials.T_window}
          />
          <mesh
            name="Text001_22"
            castShadow
            receiveShadow
            geometry={nodes.Text001_22.geometry}
            material={materials['Material.002']}
          />
          <mesh
            name="Text001_23"
            castShadow
            receiveShadow
            geometry={nodes.Text001_23.geometry}
            material={materials['Material.003']}
          />
        </group>
      </group>
    </group>
  );
}
