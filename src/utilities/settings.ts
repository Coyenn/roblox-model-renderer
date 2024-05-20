export interface QualityPreset {
  samples: number;
  bounces: number;
  envMapIntensity: number;
  enableDenoise: boolean;
}

export interface Settings {
  renderer: {
    quality: keyof typeof qualityPresets;
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

export const qualityPresets = {
  low: {
    samples: 32,
    bounces: 2,
    envMapIntensity: 1,
    enableDenoise: true,
  },
  medium: {
    samples: 128,
    bounces: 5,
    envMapIntensity: 1,
    enableDenoise: true,
  },
  high: {
    samples: 512,
    bounces: 8,
    envMapIntensity: 1,
    enableDenoise: true,
  },
  ultra: {
    samples: 2048,
    bounces: 10,
    envMapIntensity: 1,
    enableDenoise: true,
  },
};

export const defaultSettings: Settings = {
  renderer: {
    quality: "medium",
  },
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
