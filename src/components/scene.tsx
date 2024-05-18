"use client";

import { ExportButtonListener } from "@/components/controls/export-button";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Raytracer } from "@react-three/lgl";
import { ACESFilmicToneMapping } from "three";

export interface SceneProps {
  outline?: boolean;
  children?: React.ReactNode;
}

export function Scene(props: SceneProps) {
  const { children, outline } = props;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 5], fov: 35 }}
    >
      <OrbitControls />
      <ExportButtonListener outline={outline} />
      <Raytracer
        toneMapping={ACESFilmicToneMapping}
        movingDownsampling={true}
        useTileRender={false}
        samples={512}
        bounces={10}
        envMapIntensity={1}
        enableDenoise={true}
      >
        {children}
        <rectAreaLight
          args={["white", 3]}
          width={5}
          height={5}
          position={[-3, 4, 1]}
          visible={false}
        />
      </Raytracer>
    </Canvas>
  );
}
