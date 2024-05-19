"use client";

import UploadIcon from "@/components/icons/upload-icon";
import useSettingsStore from "@/stores/useSettingsStore";
import { useRef } from "react";

export default function UploadButton() {
  const settings = useSettingsStore((state) => state.settings);
  const setSettings = useSettingsStore((state) => state.setSettings);
  const inputRef = useRef<HTMLInputElement>(null);

  function onUpload(objUrl: string, mtlUrl: string) {
    setSettings({
      ...settings,
      model: {
        ...settings.model,
        paths: [
          {
            path: objUrl,
            type: "obj",
          },
          {
            path: mtlUrl,
            type: "mtl",
          },
        ],
      },
      scene: {
        ...settings.scene,
        enabled: true,
      },
    });
  }

  return (
    <>
      <input
        type="file"
        accept=".obj,.mtl"
        multiple
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            const fileList = e.target.files;
            let obj;
            let mtl;

            for (const file of fileList) {
              if (file.name.endsWith(".obj")) {
                obj = file;
              } else if (file.name.endsWith(".mtl")) {
                mtl = file;
              }
            }

            if (!obj || !mtl) {
              return;
            }

            const objUrl = URL.createObjectURL(obj);
            const mtlUrl = URL.createObjectURL(mtl);

            onUpload(objUrl, mtlUrl);
          }
        }}
        className="hidden"
      />
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
        className="flex h-full items-center gap-2 bg-neutral-900 p-2 px-4 py-2 text-white transition-colors hover:bg-neutral-950"
      >
        <UploadIcon className="h-4 w-4" />
        Import
      </button>
    </>
  );
}
