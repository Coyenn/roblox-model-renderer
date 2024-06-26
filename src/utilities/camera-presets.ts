import { Euler, Vector3 } from "three";

export interface CameraPreset {
  rotation: Euler;
  position: Vector3;
}

export const cameraPresets: Record<string, CameraPreset> = {
  default: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 0, 15),
  },
  icon: {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(3, 0, 15),
  },
  "icon-medium": {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(5, 0, 25),
  },
  "icon-large": {
    rotation: new Euler(0.2, 0.2, 0),
    position: new Vector3(7, 0, 35),
  },
};
