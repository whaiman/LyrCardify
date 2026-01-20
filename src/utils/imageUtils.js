/**
 * Generates a filtered version of an image using canvas.
 * This is used because html2canvas does not support the CSS filter property.
 * @param {string} imageUrl
 * @param {string} filter CSS filter string (e.g., 'blur(20px) brightness(0.7)')
 * @param {number} scale Optional scale factor for performance (default 1)
 * @returns {Promise<string>} Data URL of the filtered image
 */
export async function getFilteredImage(imageUrl, filter, scale = 1) {
  return new Promise((resolve) => {
    if (!imageUrl || !filter || filter === "none") {
      resolve(imageUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Ensure canvas is large enough
      if (canvas.width === 0 || canvas.height === 0) {
        resolve(imageUrl);
        return;
      }

      // Apply filter to context
      ctx.filter = filter;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(dataUrl);
      } catch (err) {
        console.error("Error generating filtered image:", err);
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      console.error("Failed to load image for filtering:", imageUrl);
      resolve(imageUrl);
    };
  });
}
