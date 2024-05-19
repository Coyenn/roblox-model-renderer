export interface Settings {
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
  scene: {
    enabled: false,
  },
  model: {},
  export: {
    width: 1920,
    height: 1080,
    fileName: "output",
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
