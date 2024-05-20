"use client";

import useApplicationStateStore from "@/stores/useApplicationStateStore";
import { useLoader } from "@react-three/fiber";
import { DoubleSide, MeshPhongMaterial } from "three";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export default function ModelLoader() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const objUrl =
    applicationState.model.paths?.find((path) => path.type === "obj")?.path ??
    "";
  const mtlUrl =
    applicationState.model.paths?.find((path) => path.type === "mtl")?.path ??
    "";

  const materials = useLoader(MTLLoader, mtlUrl);
  const object = useLoader(OBJLoader, objUrl, (loader) => {
    materials.side = DoubleSide;
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <primitive
      object={object}
      rotation={applicationState.model.rotation}
      scale={applicationState.model.scale}
      position={applicationState.model.position}
      material={new MeshPhongMaterial()}
    />
  );
}
