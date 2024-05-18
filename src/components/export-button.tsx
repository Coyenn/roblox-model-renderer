"use client";

import DownloadIcon from "@/components/icons/download-icon";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import ImageJS from "image-js";
import { outlineImage } from "@/utilities/outline";

export function ExportButtonListener() {
  const gl = useThree((state) => state.gl);

  async function exportImage() {
    const link = document.createElement("a");
    const loadedImage = await ImageJS.load(gl.domElement.toDataURL());

    // Crop to 1:1 aspect ratio
    const croppedImage = loadedImage.crop({
      width: gl.domElement.height,
      height: gl.domElement.height,
      x: gl.domElement.width / 2 - gl.domElement.height / 2,
      y: 0,
    });

    // Outline the image
    const outlinedImage = outlineImage(croppedImage);

    // Create data URL and set download attributes
    gl.setClearColor("#000000", 0);
    link.setAttribute("download", "export.png");
    link.setAttribute("href", outlinedImage);

    link.click();
    link.remove();
  }

  useEffect(() => {
    const exportButton = document.getElementById("export-button");

    exportButton?.addEventListener("click", () => {
      void exportImage();
    });

    return () => {
      exportButton?.removeEventListener("click", () => {
        void exportImage();
      });
    };
  });

  return <></>;
}

export default function ExportButton() {
  return (
    <button
      id="export-button"
      className="absolute right-0 top-0 z-10 m-2 flex items-center gap-2 bg-neutral-800 p-2 px-4 py-2 text-white transition-colors hover:bg-neutral-950"
    >
      <DownloadIcon className="h-4 w-4" />
      Export
    </button>
  );
}
