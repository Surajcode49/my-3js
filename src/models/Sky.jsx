import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import SkyScene from "../assets/3d/space_nebula_hdri_panorama_360_skydome.glb";

export function Sky() {
  const sky = useGLTF(SkyScene);
  const skyRef = useRef();

  useEffect(() => {
    let animationId = null;

    const animate = () => {
      // Rotate the sky continuously
      skyRef.current.rotation.x -= 0.001; // Rotate in the negative x-axis
      // You can adjust the rotation speed by changing the value

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    if (sky.scene) {
      const scaleFactor = -70;
      skyRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      skyRef.current.position.z = 0;
    }
  }, [sky.scene]);

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene.clone(true)} />
    </mesh>
  );
}
