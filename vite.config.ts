import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@core": path.resolve(__dirname, "src/core"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@store": path.resolve(__dirname, "src/store"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@appTypes": path.resolve(__dirname, "src/types"),
      "@assets": path.resolve(__dirname, "src/assets"),
    }
  }
});
