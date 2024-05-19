"use client";

import { ExportButtonListener } from "@/components/controls/export-button";
import useSettingsStore from "@/stores/useSettingsStore";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Raytracer } from "@react-three/lgl";
import { ACESFilmicToneMapping } from "three";

export interface SceneProps {
  children?: React.ReactNode;
}

export function Scene(props: SceneProps) {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);
  const { children } = props;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 5], fov: 35 }}
      onCreated={(state) => state.gl.setClearColor("#000000", 0)}
    >
      <OrbitControls
        onChange={(e) => {
          setSettings({
            ...settings,
            metadata: {
              ...settings.metadata,
              position: e?.target.object.position,
              rotation: e?.target.object.rotation,
            },
          });
        }}
      />
      <ExportButtonListener />
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
