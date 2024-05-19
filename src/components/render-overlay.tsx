"use client";

import useSettingsStore from "@/stores/useSettingsStore";

export default function RenderOverlay() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex h-screen w-screen items-center justify-center">
        <div className="aspect-square h-[100vh] border-x border-zinc-300"></div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-6 -translate-x-1/2 -translate-y-1/2 border-b border-zinc-300"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-6 -translate-x-1/2 -translate-y-1/2 border-r border-zinc-300"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 m-2 flex flex-col items-end">
        <p className="text-xs text-zinc-500">
          Position: X: {settings.metadata.position?.x.toFixed(3)} Y:{" "}
          {settings.metadata.position?.y.toFixed(3)} Z:{" "}
          {settings.metadata.position?.z.toFixed(3)}
        </p>
        <p className="text-xs text-zinc-500">
          Rotation: X: {settings.metadata.rotation?.x.toFixed(3)} Y:{" "}
          {settings.metadata.rotation?.y.toFixed(3)} Z:{" "}
          {settings.metadata.rotation?.z.toFixed(3)}
        </p>
      </div>
    </>
  );
}
