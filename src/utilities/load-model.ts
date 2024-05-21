import { type ModelPath } from "@/utilities/applicationState";
import { type Object3D } from "three";
import {
  MTLLoader,
  OBJLoader,
  GLTFLoader,
  FBXLoader,
} from "three/examples/jsm/Addons.js";

export async function loadObj(paths: ModelPath[]): Promise<Object3D> {
  const objUrl = paths.find((path) => path.type === "obj")?.path;
  const mtlUrl = paths.find((path) => path.type === "mtl")?.path;

  if (!objUrl) {
    throw new Error("No obj file found");
  }

  if (!mtlUrl) {
    throw new Error("No mtl file found");
  }

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  return new Promise<Object3D>((resolve, reject) => {
    mtlLoader.load(mtlUrl, (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load(
        objUrl,
        (loadedObject) => {
          resolve(loadedObject);
        },
        undefined,
        reject,
      );
    });
  });
}

export async function loadFbx(paths: ModelPath[]): Promise<Object3D> {
  const fbxUrl = paths.find((path) => path.type === "fbx")?.path;

  if (!fbxUrl) {
    throw new Error("No fbx file found");
  }

  const fbxLoader = new FBXLoader();

  return new Promise<Object3D>((resolve) => {
    fbxLoader.load(fbxUrl, (loadedObject) => {
      resolve(loadedObject);
    });
  });
}

export async function loadGltf(paths: ModelPath[]): Promise<Object3D> {
  const gltfUrl = paths.find(
    (path) => path.type === "gltf" || path.type === "glb",
  )?.path;

  if (!gltfUrl) {
    throw new Error("No gltf file found");
  }

  const gltfLoader = new GLTFLoader();

  return new Promise<Object3D>((resolve) => {
    gltfLoader.load(gltfUrl, (loadedObject) => {
      resolve(loadedObject.scene);
    });
  });
}

export default function loadModel(
  paths?: ModelPath[],
): Promise<Object3D> | undefined {
  if (!paths) return;

  const firstFileType = paths[0]?.type;

  switch (firstFileType) {
    case "obj":
      return loadObj(paths);
    case "mtl":
      return loadObj(paths);
    case "fbx":
      return loadFbx(paths);
    case "gltf":
      return loadGltf(paths);
    case "glb":
      return loadGltf(paths);
    default:
      throw new Error(`Unsupported file type: ${firstFileType}`);
  }
}
