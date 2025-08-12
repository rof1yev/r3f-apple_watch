import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Watch from "./watch";
import { useEffect, useRef, type FC } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera as PerspectiveCameraImpl } from "three";
import gsap from "gsap";

type Props = {
  progress: number;
};

const Scene: FC<Props> = ({ progress }) => {
  const cameraRef = useRef<PerspectiveCameraImpl>(null);

  useFrame(() => {
    if (cameraRef.current) cameraRef.current.lookAt(0, 0, 0);
  });

  useEffect(() => {
    (() => {
      const positions: number[][] = [
        [3.5, 2.17, 3.7],
        [3.7, 0.6, 0.7],
        [2.3, 0.87, -4.2],
        [0, 2.5, 3.6],
      ];

      if (progress >= 1) {
        gsap.to(cameraRef.current!.position, {
          x: 0,
          y: 2.5,
          z: 3.6,
          duration: 0.5,
          ease: "power1.out",
        });
      } else {
        const segmentProgress = 1 / 3;
        const segmentIndex = Math.floor(progress / segmentProgress);
        const perentage = (progress % segmentProgress) / segmentProgress;

        const [startX, startY, startZ] = positions[segmentIndex];
        const [endX, endY, endZ] = positions[segmentIndex + 1];

        const x = startX + (endX - startX) * perentage;
        const y = startY + (endY - startY) * perentage;
        const z = startZ + (endZ - startZ) * perentage;

        gsap.to(cameraRef.current!.position, {
          x,
          y,
          z,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    })();
  }, [progress, cameraRef]);

  return (
    <>
      <OrbitControls minDistance={40} maxDistance={60} />
      <PerspectiveCamera
        ref={cameraRef}
        fov={45}
        near={1}
        far={10000}
        makeDefault
        position={[0, 0, 10]}
      />
      <Environment preset="city" />
      <Watch scale={[1, 1, 1]} />

      {/* <axesHelper args={[500]} /> */}
    </>
  );
};

export default Scene;
