"use client";

import { Scene } from "@/components/scene";
import ModelLoader from "@/components/model-loader";
import ExportButton from "@/components/controls/export-button";
import RenderOverlay from "@/components/render-overlay";
import Toolbar from "@/components/controls/toolbar";
import ImportButton from "@/components/controls/import-button";
import OutlineButton from "@/components/controls/outline-button";
import useSettingsStore from "@/stores/useSettingsStore";

export default function Home() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <main className="h-screen w-screen">
      {settings.model.paths && settings.model.paths?.length > 0 ? (
        <>
          <Toolbar>
            <OutlineButton />
            <ExportButton />
          </Toolbar>
          <RenderOverlay />
          {settings.scene.enabled && (
            <Scene>
              <ModelLoader />
            </Scene>
          )}
        </>
      ) : (
        <div className="absolute flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-neutral-300 bg-neutral-50 px-8 py-10">
            <ImportButton />
            <p className="text-neutral-500">
              Please select an .obj and .mtl file to import.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
