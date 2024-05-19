import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApplicationStateStore from "@/stores/useApplicationStateStore";

export interface QualityPreset {
  samples: number;
  bounces: number;
  envMapIntensity: number;
  enableDenoise: boolean;
}

export default function QualitySelect() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );
  const qualityPresets = {
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

  return (
    <Select
      onValueChange={(newValue) => {
        let qualityPreset;

        for (const [key, value] of Object.entries(qualityPresets)) {
          if (key === newValue) {
            qualityPreset = value;
          }
        }

        if (!qualityPreset) {
          return;
        }

        setApplicationState({
          ...applicationState,
          raytracer: {
            ...applicationState.raytracer,
            samples: qualityPreset.samples,
            bounces: qualityPreset.bounces,
            envMapIntensity: qualityPreset.envMapIntensity,
            enableDenoise: qualityPreset.enableDenoise,
          },
        });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Quality" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="low">Quality: Low</SelectItem>
        <SelectItem value="medium">Quality: Medium</SelectItem>
        <SelectItem value="high">Quality: High</SelectItem>
        <SelectItem value="ultra">Quality: Ultra</SelectItem>
      </SelectContent>
    </Select>
  );
}
