import { cameraPresets } from "@/utilities/camera-presets";
import { Euler, type Object3D, Vector3 } from "three";

export type ModelExtension = "obj" | "mtl" | "fbx" | "gltf" | "glb";

export interface ModelPath {
  path: string;
  type: ModelExtension;
}

export interface ApplicationState {
  isExporting: boolean;
  metadata: {
    position: Vector3;
    rotation: Euler;
  };
  scene: {
    enabled: boolean;
  };
  raytracer: {
    enabled: boolean;
  };
  camera: {
    preset?: keyof typeof cameraPresets;
  };
  model: {
    paths?: ModelPath[]; // Can be one or, in the case of obj, multiple (.obj, .mtl)
    object?: Object3D;
    rotation?: Euler;
    position?: Vector3;
    scale?: Vector3;
  };
}

export const defaultApplicationState: ApplicationState = {
  isExporting: false,
  metadata: {
    position: cameraPresets.default!.position,
    rotation: cameraPresets.default!.rotation,
  },
  raytracer: {
    enabled: false,
  },
  scene: {
    enabled: false,
  },
  camera: {
    preset: "default",
  },
  model: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 0, 0),
  },
};
