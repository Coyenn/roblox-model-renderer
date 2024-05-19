"use client";

import DownloadIcon from "@/components/icons/download-icon";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import ImageJS from "image-js";
import { outlineImage } from "@/utilities/outline";
import useSettingsStore from "@/stores/useSettingsStore";
import { Button } from "@/components/ui/button";

export function ExportButtonListener() {
  const gl = useThree((state) => state.gl);
  const settings = useSettingsStore((state) => state.settings);

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

      let imageToExport;

      if (settings.export.outline.enabled) {
        imageToExport = outlineImage(
          croppedImage,
          settings.export.outline.width,
        );
      } else {
        imageToExport = croppedImage.toDataURL();
      }

      gl.setClearColor(
        settings.export.backgroundColor,
        settings.export.transparency ? 0 : 1,
      );

      link.setAttribute(
        "download",
        `${settings.export.fileName}.${settings.export.format}`,
      );
      link.setAttribute("href", imageToExport);

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
  return (
    <Button id="export-button" className="gap-2">
      <DownloadIcon className="h-4 w-4" />
      Export
    </Button>
  );
}
