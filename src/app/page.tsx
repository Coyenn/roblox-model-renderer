"use client";

import { Scene } from "@/components/scene";
import ModelLoader from "@/components/model-loader";
import ExportButton from "@/components/controls/export-button";
import RenderOverlay from "@/components/render-overlay";
import Toolbar from "@/components/controls/toolbar";
import ImportButton from "@/components/controls/import-button";
import { useState } from "react";
import OutlineButton from "@/components/controls/outline-button";

export default function Home() {
  const [objFileUrl, setObjFileUrl] = useState<string>();
  const [mtlFileUrl, setMtlFileUrl] = useState<string>();
  const [outline, setOutline] = useState<boolean>(true);
  const [sceneEnabled, setSceneEnabled] = useState<boolean>(true);

  return (
    <main className="h-screen w-screen">
      {objFileUrl && mtlFileUrl ? (
        <>
          <Toolbar>
            <OutlineButton
              onClick={() => {
                setOutline(!outline);
                setSceneEnabled(false);

                setTimeout(() => {
                  setSceneEnabled(true);
                }, 10);
              }}
              active={outline}
            />
            <ExportButton />
          </Toolbar>
          <RenderOverlay />
          {sceneEnabled && (
            <Scene outline={outline}>
              <ModelLoader objUrl={objFileUrl} mtlUrl={mtlFileUrl} />
            </Scene>
          )}
        </>
      ) : (
        <div className="absolute flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-neutral-300 bg-neutral-50 px-8 py-10">
            <ImportButton
              onUpload={(objUrl, mtlUrl) => {
                setObjFileUrl(objUrl);
                setMtlFileUrl(mtlUrl);
              }}
            />
            <p className="text-neutral-500">
              Please select an .obj and .mtl file to import.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
