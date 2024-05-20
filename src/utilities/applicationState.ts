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
  },
  scene: {
    enabled: false,
  },
  model: {},
};
