"use client";

import { ExportButtonListener } from "@/components/controls/export-button";
import useApplicationStateStore from "@/stores/useApplicationStateStore";
import useSettingsStore from "@/stores/useSettingsStore";
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
          enabled: true,
        },
      });
    }, 1);
  }

  useEffect(() => {
    applySettings();
  }, [settings]);

  useEffect(() => {
    applySettings();
  }, []);

  return <></>;
}

export function Scene(props: SceneProps) {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );
  const { children } = props;

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 5], fov: 35 }}
    >
      <SceneSetup />
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
      {applicationState.raytracer.enabled && (
        <Raytracer
          toneMapping={ACESFilmicToneMapping}
          movingDownsampling={true}
          useTileRender={false}
          samples={applicationState.raytracer.samples}
          bounces={applicationState.raytracer.bounces}
          envMapIntensity={applicationState.raytracer.envMapIntensity}
          enableDenoise={applicationState.raytracer.enableDenoise}
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
      )}
    </Canvas>
  );
}
