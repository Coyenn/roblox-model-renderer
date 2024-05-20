import { Euler, Vector3 } from "three";

export interface CameraPreset {
  rotation: Euler;
  position: Vector3;
}

export const cameraPresets: Record<string, CameraPreset> = {
  default: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 0, 5),
  },
  icon: {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(1, 0, 4.5),
  },
  "icon-medium": {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(1.5, 0, 7),
  },
  "icon-large": {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(2, 0, 9),
  },
};
