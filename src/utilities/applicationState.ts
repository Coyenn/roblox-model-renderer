import { cameraPresets } from "@/utilities/camera-presets";
import { Euler, Vector3 } from "three";

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
    paths?: {
      path: string;
      type: "obj" | "mtl" | "fbx" | "gltf";
    }[]; // Can be one or, in the case of obj, multiple (.obj, .mtl)
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
    rotation: new Euler(0, -Math.PI, 0),
    position: new Vector3(0, 0, 0),
  },
};
