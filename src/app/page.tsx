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
          onUpload={(objUrl, mtlUrl) => {
            setObjFileUrl(objUrl);
            setMtlFileUrl(mtlUrl);
          }}
        />
        <ExportButton />
      </Toolbar>
      {objFileUrl && mtlFileUrl && (
        <Scene>
          <ModelLoader objUrl={objFileUrl} mtlUrl={mtlFileUrl} />
        </Scene>
      )}
    </main>
  );
}
