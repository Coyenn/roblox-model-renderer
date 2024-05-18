"use client";

import UploadIcon from "@/components/icons/upload-icon";
import { useRef } from "react";

export interface UploadButtonProps {
  onUpload: (files: FileList) => void;
}

export default function UploadButton(props: UploadButtonProps) {
  const { onUpload } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept=".obj,.mtl"
        multiple
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            onUpload(e.target.files);
          }
        }}
        className="hidden"
      />
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
        className="flex h-full items-center gap-2 bg-neutral-800 p-2 px-4 py-2 text-white transition-colors hover:bg-neutral-950"
      >
        <UploadIcon className="h-4 w-4" />
        Upload
      </button>
    </>
  );
}
