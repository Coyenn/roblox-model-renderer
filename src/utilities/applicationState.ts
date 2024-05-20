import { Euler, Vector3 } from "three";

export interface ApplicationState {
  isExporting: boolean;
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
    rotation?: Euler;
    position?: Vector3;
    scale?: Vector3;
  };
}

export const defaultApplicationState: ApplicationState = {
  isExporting: false,
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
  model: {
    rotation: new Euler(0, -Math.PI, 0),
    position: new Vector3(0, 0, 0),
  },
};
