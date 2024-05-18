"use client";

import { useLoader } from "@react-three/fiber";
import { Box3 } from "three";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export default function ModelLoader() {
  const objUrl = "/DarkAngel.obj";
  const mtlUrl = "/DarkAngel.mtl";

  const materials = useLoader(MTLLoader, mtlUrl);
  const object = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  const sizingBox = new Box3().setFromObject(object);
  const xSize = sizingBox.max.x - sizingBox.min.x;
  const ySize = sizingBox.max.y - sizingBox.min.y;
  const zSize = sizingBox.max.z - sizingBox.min.z;
  const scaleFactor = 3 / Math.max(xSize, ySize, zSize);

  object.scale.set(scaleFactor, scaleFactor, scaleFactor);
  object.rotateY(-Math.PI);

  return <primitive object={object} />;
}
