import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@r", replacement: path.resolve(__dirname, "./src") },
      { find: "@router", replacement: path.resolve(__dirname, "./src/pages") },
      { find: "@styles", replacement: path.resolve(__dirname, "./src/styles") },
      { find: "@playgrounds", replacement: path.resolve(__dirname, "./") },
    ],
  },
  // https://vitejs.dev/guide/build.html#customizing-the-build
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "we-are-[name]-[hash].js",
        assetFileNames: "assets/we-are-[name]-[hash].[ext]",
        chunkFileNames: "we-are-[name]-[hash].js",
      },
    },
  },
});
