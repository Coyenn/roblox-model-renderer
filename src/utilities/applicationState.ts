import { Euler, Vector3 } from "three";

export interface ApplicationState {
  metadata: {
    position?: Vector3;
    rotation?: Euler;
  };
  scene: {
    enabled: boolean;
  };
  raytracer: {
    enabled: boolean;
    samples: number;
    bounces: number;
    envMapIntensity: number;
    enableDenoise: boolean;
  };
  model: {
    paths?: {
      path: string;
      type: "obj" | "mtl" | "fbx" | "gltf";
    }[]; // Can be one or, in the case of obj, multiple (.obj, .mtl)
  };
}

export const defaultApplicationState: ApplicationState = {
  metadata: {
    position: new Vector3(),
    rotation: new Euler(),
  },
  raytracer: {
    enabled: false,
    // medium
    samples: 128,
    bounces: 5,
    envMapIntensity: 1,
    enableDenoise: true,
  },
  scene: {
    enabled: false,
  },
  model: {},
};
