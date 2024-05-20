"use client";

import useApplicationStateStore from "@/stores/useApplicationStateStore";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Box3, DoubleSide, Euler, MeshPhongMaterial, Vector3 } from "three";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export default function ModelLoader() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
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

  useEffect(() => {
    const sizingBox = new Box3().setFromObject(object);
    const xSize = sizingBox.max.x - sizingBox.min.x;
    const ySize = sizingBox.max.y - sizingBox.min.y;
    const zSize = sizingBox.max.z - sizingBox.min.z;
    const scaleFactor = 2 / Math.min(xSize, ySize, zSize);

    object.scale.set(scaleFactor, scaleFactor, scaleFactor);
    setApplicationState({
      ...applicationState,
      model: {
        ...applicationState.model,
        scale: new Vector3(scaleFactor, scaleFactor, scaleFactor),
      },
    });
  }, [objUrl, mtlUrl]);

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
