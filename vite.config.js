import { defineConfig, esmExternalRequirePlugin } from "vite";

export default defineConfig({
  plugins: [
    esmExternalRequirePlugin({
      external: ["react", "react-dom", "react-dom/client"],
    }),
  ],
  build: {
    outDir: "dist-vite",
    minify: false,
  },
});
