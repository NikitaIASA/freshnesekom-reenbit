import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@core": "/src/core",
      "@hooks": "/src/hooks",
      "@helpers": "/src/helpers",
      "@constants": "/src/constants",
      "@store": "/src/store",
      "@styles": "/src/styles",
      "@types": "/src/types",
      "@assets": "/src/assets"
    }
  }
});
