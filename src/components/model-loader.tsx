"use client";

import { useLoader } from "@react-three/fiber";
import { Box3 } from "three";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export interface ModelLoaderProps {
  objUrl: string;
  mtlUrl: string;
}

export default function ModelLoader(props: ModelLoaderProps) {
  const { objUrl, mtlUrl } = props;

  const materials = useLoader(MTLLoader, mtlUrl);
  const object = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const sizingBox = new Box3().setFromObject(object);
  const xSize = sizingBox.max.x - sizingBox.min.x;
  const ySize = sizingBox.max.y - sizingBox.min.y;
  const zSize = sizingBox.max.z - sizingBox.min.z;
  const scaleFactor = 2 / Math.min(xSize, ySize, zSize);

  object.scale.set(scaleFactor, scaleFactor, scaleFactor);
  object.rotateY(-Math.PI - 0.3);
  object.rotateX(0.3);

  return <primitive object={object} position={[0, -0.25, 0]} />;
}
