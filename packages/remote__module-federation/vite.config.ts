import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "http://localhost:9001",
  plugins: [
    react(),
    federation({
      name: "RemoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/App",
        "./home": "./src/pages/Home",
        "./button": "./src/components/Button",
      },
      shared: {
        "react/": { singleton: true, requiredVersion: "19.0.0" },
        react: { singleton: true, requiredVersion: "19.0.0" },
        "react-dom/": { singleton: true, requiredVersion: "19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "19.0.0" },
      },
    }),
  ],
  build: {
    target: "chrome89",
    cssCodeSplit: false,
    minify: false,
  },
  server: {
    host: "localhost",
    port: 9001,
    strictPort: true,
    origin: "http://localhost:9001",
  },
  preview: {
    host: "localhost",
    port: 9001,
    strictPort: true,
  },
});
