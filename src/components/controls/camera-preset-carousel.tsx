import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useApplicationStateStore from "@/stores/useApplicationStateStore";
import { cameraPresets } from "@/utilities/camera-presets";

export function CameraPresetCarousel() {
  const applicationState = useApplicationStateStore(
    (state) => state.applicationState,
  );
  const setApplicationState = useApplicationStateStore(
    (state) => state.setApplicationState,
  );

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Object.entries(cameraPresets).map(([name, preset]) => {
          const isActive = applicationState.camera.preset === name;

          return (
            <CarouselItem key={name} className="basis-1/3">
              <button className="block h-full w-full p-1">
                <Card
                  className={`h-full w-full ${
                    isActive ? "bg-white" : "bg-gray-100 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setApplicationState({
                      ...applicationState,
                      scene: {
                        ...applicationState.scene,
                        enabled: false,
                      },
                    });
                    setTimeout(() => {
                      setApplicationState({
                        ...applicationState,
                        metadata: {
                          ...applicationState.metadata,
                          position: preset.position,
                          rotation: preset.rotation,
                        },
                        camera: {
                          ...applicationState.camera,
                          preset: name,
                        },
                        scene: {
                          ...applicationState.scene,
                          enabled: true,
                        },
                      });
                    }, 1);
                  }}
                >
                  <CardContent className="flex h-full items-center justify-center p-3">
                    <span className="text-md text-center">{name}</span>
                  </CardContent>
                </Card>
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
