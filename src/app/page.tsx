"use client";

import { Scene } from "@/components/scene";
import ModelLoader from "@/components/model-loader";
import ExportButton from "@/components/controls/export-button";
import RenderOverlay from "@/components/render-overlay";
import Toolbar from "@/components/controls/toolbar";
import ImportButton from "@/components/controls/import-button";
import OutlineButton from "@/components/controls/outline-button";
import useSettingsStore from "@/stores/useSettingsStore";
import GitHubIcon from "@/components/icons/github-icon";
import Link from "next/link";
import RobloxIcon from "@/components/icons/roblox-icon";
import XIcon from "@/components/icons/x-icon";

export default function Home() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <main className="h-screen w-screen">
      {settings.model.paths && settings.model.paths?.length > 0 ? (
        <>
          <Toolbar>
            <OutlineButton />
            <ExportButton />
          </Toolbar>
          <RenderOverlay />
          {settings.scene.enabled && (
            <Scene>
              <ModelLoader />
            </Scene>
          )}
        </>
      ) : (
        <div className="absolute flex h-screen w-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-neutral-300 bg-neutral-50 px-8 py-10">
            <ImportButton />
            <p className="text-neutral-500">
              Please select an .obj and .mtl file to import.
            </p>
            <div className="flex items-center gap-4 text-neutral-400">
              <Link
                href="https://github.com/Coyenn/roblox-model-renderer"
                target="_blank"
                className="hover:text-neutral-900"
              >
                <GitHubIcon className="h-8 w-8" />
                <span className="sr-only">View on GitHub</span>
              </Link>
              <Link
                href="https://www.roblox.com/users/329970024/profile"
                target="_blank"
                className="hover:text-neutral-900"
              >
                <RobloxIcon className="h-8 w-8" />
                <span className="sr-only">Follow me on Roblox</span>
              </Link>
              <Link
                href="https://twitter.com/Kojenia"
                target="_blank"
                className="hover:text-neutral-900"
              >
                <XIcon className="h-8 w-8" />
                <span className="sr-only">Follow me on X/Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
