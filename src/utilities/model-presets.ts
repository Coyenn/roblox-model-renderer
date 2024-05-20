import { Euler, Vector3 } from "three";

export interface ModelPreset {
  rotation: Euler;
  position: Vector3;
  scale?: Vector3;
}

export const modelPresets: Record<string, ModelPreset> = {
  default: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 0, 0),
  },
  icon: {
    rotation: new Euler(-3.4, 0.3, 0),
    position: new Vector3(0, 0, 0),
  },
};
