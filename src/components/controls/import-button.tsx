"use client";

import UploadIcon from "@/components/icons/upload-icon";
import useApplicationStateStore from "@/stores/useApplicationStateStore";
import {
  type ModelExtension,
  type ModelPath,
} from "@/utilities/applicationState";
import loadModel from "@/utilities/load-model";
import { useRef } from "react";

export default function UploadButton() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  function onUpload(fileList: FileList) {
    const fileArray = Array.from(fileList);
    const paths: ModelPath[] = fileArray
      .map((file) => ({
        path: URL.createObjectURL(file),
        type: file.name.split(".").pop() as ModelExtension,
      }))
      .filter((path) => path.type !== undefined);

    void loadModel(paths)?.then((object) => {
      setApplicationState({
        ...applicationState,
        model: {
          ...applicationState.model,
          object: object,
          paths: paths,
        },
        scene: {
          ...applicationState.scene,
          enabled: true,
        },
      });
    });
  }

  return (
    <>
      <input
        type="file"
        accept=".obj,.mtl,.fbx,.gltf,.glb"
        multiple
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            const fileList = e.target.files;

            onUpload(fileList);
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
