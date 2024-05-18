import { Scene } from "@/components/scene";
import ModelLoader from "@/components/model-loader";
import ExportButton from "@/components/export-button";
import RenderOverlay from "@/components/render-overlay";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <RenderOverlay />
      <ExportButton />
      <Scene>
        <ModelLoader />
      </Scene>
    </main>
  );
}
