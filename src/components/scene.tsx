"use client";

import { ExportButtonListener } from "@/components/controls/export-button";
import useApplicationStateStore from "@/stores/useApplicationStateStore";
import useSettingsStore from "@/stores/useSettingsStore";
import { qualityPresets } from "@/utilities/settings";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Raytracer } from "@react-three/lgl";
import { useEffect } from "react";
import { ACESFilmicToneMapping } from "three";

export interface SceneProps {
  children?: React.ReactNode;
}

function SceneSetup() {
  const settings = useSettingsStore((state) => state.settings);
  const gl = useThree((state) => state.gl);

  function applySettings() {
    gl.setClearColor(
      settings.export.backgroundColor,
      settings.export.transparency ? 0 : 1,
    );
  }

  useEffect(() => {
    applySettings();
  }, [settings]);

  return <></>;
}

export function Scene(props: SceneProps) {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );
  const settings = useSettingsStore((state) => state.settings);
  const { children } = props;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      shadows
      camera={{
        position: applicationState.metadata.position,
        rotation: applicationState.metadata.rotation,
        fov: 35,
      }}
    >
      <SceneSetup />
      <OrbitControls
        makeDefault
        onChange={(e) => {
          setApplicationState({
            ...applicationState,
            metadata: {
              ...applicationState.metadata,
              position:
                e?.target.object.position ?? applicationState.metadata.position,
              rotation:
                e?.target.object.rotation ?? applicationState.metadata.rotation,
            },
          });
        }}
        enableDamping={false}
      />
      <ExportButtonListener />
      <Raytracer
        toneMapping={ACESFilmicToneMapping}
        movingDownsampling={true}
        useTileRender={false}
        samples={qualityPresets[settings.renderer.quality].samples}
        bounces={qualityPresets[settings.renderer.quality].bounces}
        envMapIntensity={
          qualityPresets[settings.renderer.quality].envMapIntensity
        }
        enableDenoise={qualityPresets[settings.renderer.quality].enableDenoise}
      >
        {children}
        <rectAreaLight
          args={["white", 3]}
          width={5}
          height={5}
          position={[-3, 6, 1]}
          visible={false}
        />
      </Raytracer>
    </Canvas>
  );
}
