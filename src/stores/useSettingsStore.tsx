import { type Settings, defaultSettings } from "@/utilities/settings";
import { create } from "zustand";

export interface SettingsStoreState {
  settings: Settings;
  setSettings: (newSettings: Settings) => void;
  resetSettings: () => void;
}

const useSettingsStore = create<SettingsStoreState>((set) => ({
  settings: defaultSettings,
  setSettings: (newSettings: Settings) =>
    set(() => ({ settings: newSettings })),
  resetSettings: () => set(() => ({ settings: defaultSettings })),
}));

export default useSettingsStore;
