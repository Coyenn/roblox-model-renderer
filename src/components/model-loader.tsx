"use client";

import useApplicationStateStore from "@/stores/useApplicationStateStore";
import { MeshPhongMaterial } from "three";

export default function ModelLoader() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );

  if (!applicationState.model.object) return null;

  return (
    <primitive
      object={applicationState.model.object}
      rotation={applicationState.model.rotation}
      scale={applicationState.model.scale}
      position={applicationState.model.position}
      material={new MeshPhongMaterial()}
    />
  );
}
