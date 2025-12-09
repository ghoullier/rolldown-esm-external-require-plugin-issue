import { rolldown } from "rolldown";
import { esmExternalRequirePlugin } from "rolldown/plugins";

const bundleConfig = {
  input: "src/main.js",
  output: {
    format: "esm",
    dir: `dist-rolldown/`,
  },
  plugins: [
    esmExternalRequirePlugin({
      external: ["react", "react-dom", "react-dom/client"],
    }),
  ],
};
const bundle = await rolldown(bundleConfig);
await bundle.write(bundleConfig.output);
