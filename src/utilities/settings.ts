import { Euler, Vector3 } from "three";

export interface Settings {
  metadata: {
    position?: Vector3;
    rotation?: Euler;
  };
  scene: {
    enabled: boolean;
  };
  model: {
    paths?: {
      path: string;
      type: "obj" | "mtl" | "fbx" | "gltf";
    }[]; // Can be one or, in the case of obj, multiple (.obj, .mtl)
  };
  export: {
    width: number;
    height: number;
    fileName: string;
    format: "png" | "jpg";
    transparency: boolean;
    backgroundColor: string;
    outline: {
      enabled: boolean;
      color: string;
      width: number;
    };
  };
}

export const defaultSettings: Settings = {
  metadata: {
    position: new Vector3(),
    rotation: new Euler(),
  },
  scene: {
    enabled: false,
  },
  model: {},
  export: {
    width: 512,
    height: 512,
    fileName: "render",
    format: "png",
    transparency: true,
    backgroundColor: "#ffffff",
    outline: {
      enabled: true,
      color: "#000000",
      width: 3,
    },
  },
};
