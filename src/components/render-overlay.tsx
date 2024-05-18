export default function RenderOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex h-screen w-screen items-center justify-center">
        <div className="aspect-square h-[100vh] border-x border-zinc-300"></div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-6 -translate-x-1/2 -translate-y-1/2 border-b border-zinc-300"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-6 -translate-x-1/2 -translate-y-1/2 border-r border-zinc-300"></div>
    </>
  );
}
