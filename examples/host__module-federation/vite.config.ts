import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "HostApp",
      manifest: true,
      remotes: {
        RemoteApp: {
          type: "module",
          name: "RemoteApp",
          entry: "http://localhost:9001/remoteEntry.js",
          entryGlobalName: "RemoteApp",
          shareScope: "default",
        },
      },
      shared: {
        "react/": { singleton: true, requiredVersion: "19.0.0" },
        react: { singleton: true, requiredVersion: "19.0.0" },
        "react-dom/": { singleton: true, requiredVersion: "19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "19.0.0" },
      },
    }),
  ],
  server: {
    host: "localhost",
    port: 9000,
    strictPort: true,
    origin: "http://localhost:9000",
  },
  build: {
    target: "chrome89",
    cssCodeSplit: false,
    minify: false,
  },
  preview: {
    host: "localhost",
    port: 9000,
    strictPort: true,
  },
});
