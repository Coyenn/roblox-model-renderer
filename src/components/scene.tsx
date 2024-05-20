"use client";

import { ExportButtonListener } from "@/components/controls/export-button";
import useApplicationStateStore from "@/stores/useApplicationStateStore";
import useSettingsStore from "@/stores/useSettingsStore";
import { qualityPresets } from "@/utilities/settings";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Raytracer } from "@react-three/lgl";
import { useEffect } from "react";
import { ACESFilmicToneMapping } from "three";

export interface SceneProps {
  children?: React.ReactNode;
}

function SceneSetup() {
  const settings = useSettingsStore((state) => state.settings);
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );
  const gl = useThree((state) => state.gl);

  function applySettings() {
    gl.setClearColor(
      settings.export.backgroundColor,
      settings.export.transparency ? 0 : 1,
    );

    // if the raytracer is enabled, we need to reload it so it can use the new settings
    if (applicationState.scene.enabled) {
      setApplicationState({
        ...applicationState,
        raytracer: {
          ...applicationState.raytracer,
          enabled: false,
        },
      });

      setTimeout(() => {
        setApplicationState({
          ...applicationState,
          raytracer: {
            ...applicationState.raytracer,
            enabled: false,
          },
        });
      }, 1);
    }
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
      camera={{ position: [0, 0, 5], fov: 35 }}
      shadows
    >
      <SceneSetup />
      <TransformControls />
      <OrbitControls
        onChange={(e) => {
          setApplicationState({
            ...applicationState,
            metadata: {
              ...applicationState.metadata,
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
          position={[-3, 4, 1]}
          visible={false}
        />
      </Raytracer>
    </Canvas>
  );
}
