import { type Settings, defaultSettings } from "@/utilities/settings";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingsStoreState {
  settings: Settings;
  setSettings: (newSettings: Settings) => void;
  resetSettings: () => void;
}

const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      setSettings: (newSettings: Settings) =>
        set(() => ({ settings: newSettings })),
      resetSettings: () => set(() => ({ settings: defaultSettings })),
    }),
    {
      name: "settings",
    },
  ),
);

export default useSettingsStore;
