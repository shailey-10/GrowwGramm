import { useLayoutEffect, useState } from "react";
import { decode } from "blurhash";

export function useBlurhash(
  blurhash: string | null,
  width: number,
  height: number,
  punch: number
) {
  punch = punch || 1;

  const [url, setUrl] = useState<string | null>();

  useLayoutEffect(() => {
    let isCancelled = false;
    width = 100;
    height = 500;
    if (!blurhash || !width || !height) return;

    const pixels = decode(blurhash, width, height, punch);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    const imageData = context!.createImageData(width, height);
    imageData.data.set(pixels);
    context!.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (!isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob!);
        });
      }
    });

    return function cleanupBlurhash() {
      isCancelled = true;
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
}
