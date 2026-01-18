import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 5173,
    open: true,
    https: true, // mkcert will handle this
    proxy: {
      "/spotify": {
        target: "https://accounts.spotify.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spotify/, ""),
      },
      "/api/spotify": {
        target: "https://api.spotify.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spotify/, "/v1"),
      },
    },
  },
  build: {
    cssMinify: true,
    minify: "esbuild",
  },
});
