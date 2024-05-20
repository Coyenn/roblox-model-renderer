import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSettingsStore from "@/stores/useSettingsStore";
import { qualityPresets } from "@/utilities/settings";

export default function QualitySelect() {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);

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

        setSettings({
          ...settings,
          renderer: {
            ...settings.renderer,
            quality: newValue as keyof typeof qualityPresets,
          },
        });
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={`Quality: ${
            settings.renderer.quality.charAt(0).toUpperCase() +
            settings.renderer.quality.slice(1)
          }`}
        />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(qualityPresets).map((key) => (
          <SelectItem key={key} value={key}>
            Quality: {key.charAt(0).toUpperCase() + key.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
