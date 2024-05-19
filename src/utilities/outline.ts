import type ImageJS from "image-js";

function drawOutline(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  outlineWidth: number,
  outlineColor: string,
) {
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = outlineWidth;

  // Draw a rectangle outline around the pixel
  ctx.strokeRect(
    x - outlineWidth,
    y - outlineWidth,
    outlineWidth * 2,
    outlineWidth * 2,
  );
}

export function addOutlineToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  outlineWidth: number,
  outlineColor: string,
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const outlineCanvas = document.createElement("canvas");
  const outlineCtx = outlineCanvas.getContext("2d")!;
  outlineCanvas.width = width;
  outlineCanvas.height = height;

  // Copy the original image
  outlineCtx.putImageData(imageData, 0, 0);

  // Loop through each pixel to detect edges of non-transparent areas
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (data[index + 3]! > 0) {
        // Check surrounding pixels
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborIndex = ((y + i) * width + (x + j)) * 4;
            if (data[neighborIndex + 3] === 0) {
              drawOutline(outlineCtx, x, y, outlineWidth, outlineColor);
              break;
            }
          }
        }
      }
    }
  }

  // Combine original image and outline
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(outlineCanvas, 0, 0);

  return [outlineCanvas, ctx];
}

export function outlineImage(image: ImageJS, outlineWidth = 4): string {
  // Convert the cropped ImageJS image to a canvas image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = image.width;
  canvas.height = image.height;
  const imageData = new ImageData(
    new Uint8ClampedArray(image.getRGBAData()),
    image.width,
    image.height,
  );
  ctx.putImageData(imageData, 0, 0);

  // Add outline around non-transparent parts
  const [outlineCanvas, outlineCanvasContext] = addOutlineToCanvas(
    ctx,
    canvas.width,
    canvas.height,
    4,
    "black",
  );

  const dataURL = canvas.toDataURL();

  // Clean up
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  outlineCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvas.remove();
  outlineCanvas.remove();

  return dataURL;
}
