"use client";

import { Scene } from "@/components/scene";
import ModelLoader from "@/components/model-loader";
import ExportButton from "@/components/export-button";
import RenderOverlay from "@/components/render-overlay";
import Toolbar from "@/components/toolbar";
import UploadButton from "@/components/upload-button";
import { useState } from "react";

export default function Home() {
  const [objFileUrl, setObjFileUrl] = useState<string>();
  const [mtlFileUrl, setMtlFileUrl] = useState<string>();

  return (
    <main className="h-screen w-screen">
      <RenderOverlay />
      <Toolbar>
        <UploadButton
          onUpload={(fileList) => {
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

            setObjFileUrl(window.URL.createObjectURL(obj));
            setMtlFileUrl(window.URL.createObjectURL(mtl));
          }}
        />
        <ExportButton />
      </Toolbar>
      <Scene>
        {objFileUrl && mtlFileUrl && (
          <ModelLoader objUrl={objFileUrl} mtlUrl={mtlFileUrl} />
        )}
      </Scene>
    </main>
  );
}
