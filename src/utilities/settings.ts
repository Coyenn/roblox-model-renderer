export interface Settings {
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
