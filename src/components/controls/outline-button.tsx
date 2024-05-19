"use client";

import useSettingsStore from "@/stores/useSettingsStore";

export interface OutlineButtonProps {
  onClick?: () => void;
}

export default function OutlineButton(props: OutlineButtonProps) {
  const { onClick } = props;
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);
  const activeClassNames =
    "bg-neutral-900 text-white hover:bg-neutral-950 border border-neutral-900 hover:border-neutral-950";
  const inactiveClassNames =
    "bg-transparent border border-neutral-900 hover:bg-neutral-600 text-neutral-900 hover:text-white hover:border-neutral-700";

  return (
    <button
      className={`flex items-center gap-2 p-2 px-4 py-2 transition-colors ${
        settings.export.outline.enabled ? activeClassNames : inactiveClassNames
      }`}
      onClick={() => {
        setSettings({
          ...settings,
          export: {
            ...settings.export,
            outline: {
              ...settings.export.outline,
              enabled: !settings.export.outline.enabled,
            },
          },
        });

        onClick?.();
      }}
    >
      Outline
    </button>
  );
}
