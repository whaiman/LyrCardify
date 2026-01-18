/**
 * Extracts dominant and secondary colors from an image URL using canvas.
 * @param {string} imageUrl
 * @returns {Promise<{primary: string, secondary: string, text: string}>}
 */
export async function extractColorsFromImage(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      const colorCounts = {};
      let maxCount = 0;
      let dominantColor = { r: 0, g: 0, b: 0 };

      // Sample pixels (every 10th pixel for performance)
      for (let i = 0; i < imageData.length; i += 40) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const rgb = `${r},${g},${b}`;

        colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
        if (colorCounts[rgb] > maxCount) {
          maxCount = colorCounts[rgb];
          dominantColor = { r, g, b };
        }
      }

      const primary = rgbToHex(
        dominantColor.r,
        dominantColor.g,
        dominantColor.b,
      );

      // Secondary: find a color that is different enough
      let secondary = primary;
      let maxDiff = 0;
      for (const rgbStr in colorCounts) {
        const [r, g, b] = rgbStr.split(",").map(Number);
        const diff =
          Math.abs(r - dominantColor.r) +
          Math.abs(g - dominantColor.g) +
          Math.abs(b - dominantColor.b);
        if (diff > maxDiff) {
          maxDiff = diff;
          secondary = rgbToHex(r, g, b);
        }
      }

      // If text is black or white based on contrast
      const brightness =
        (dominantColor.r * 299 +
          dominantColor.g * 587 +
          dominantColor.b * 114) /
        1000;
      const text = brightness > 128 ? "#000000" : "#FFFFFF";

      resolve({ primary, secondary, text });
    };

    img.onerror = () => {
      resolve({ primary: "#191414", secondary: "#1DB954", text: "#FFFFFF" });
    };
  });
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
