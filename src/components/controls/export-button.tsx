"use client";

import DownloadIcon from "@/components/icons/download-icon";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import ImageJS from "image-js";
import { outlineImage } from "@/utilities/outline";
import useSettingsStore from "@/stores/useSettingsStore";

export function ExportButtonListener() {
  const settings = useSettingsStore((state) => state.settings);
  const gl = useThree((state) => state.gl);

  function exportImage() {
    const link = document.createElement("a");
    void ImageJS.load(gl.domElement.toDataURL()).then((loadedImage) => {
      // Crop to 1:1 aspect ratio
      const croppedImage = loadedImage
        .crop({
          width: gl.domElement.height,
          height: gl.domElement.height,
          x: gl.domElement.width / 2 - gl.domElement.height / 2,
          y: 0,
        })
        .resize({
          width: settings.export.width,
          height: settings.export.height,
        });

      let exportImage;

      if (settings.export.outline.enabled) {
        exportImage = outlineImage(croppedImage, settings.export.outline.width);
      } else {
        exportImage = croppedImage.toDataURL();
      }

      gl.setClearColor(
        settings.export.backgroundColor,
        settings.export.transparency ? 0 : 1,
      );
      link.setAttribute(
        "download",
        `${settings.export.fileName}.${settings.export.format}`,
      );
      link.setAttribute("href", exportImage);

      link.click();
      link.remove();
    });
  }

  useEffect(() => {
    const exportButton = document.getElementById("export-button");

    exportButton?.addEventListener("click", exportImage);

    return () => {
      exportButton?.removeEventListener("click", exportImage);
    };
  });

  return <></>;
}

export default function ExportButton() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <button
      id="export-button"
      className="flex items-center gap-2 border border-neutral-900 bg-neutral-900 p-2 px-4 py-2 text-white transition-colors hover:border-neutral-950 hover:bg-neutral-950"
    >
      <DownloadIcon className="h-4 w-4" />
      Export as {settings.export.format.toUpperCase()}
    </button>
  );
}
