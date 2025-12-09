# rolldown-esm-external-require-plugin-issue

> This repository demonstrates an issue with the `esmExternalRequirePlugin` when used with Vite.

`vite` and `rolldown` does not works the same with the `esmExternalRequirePlugin`

```js
esmExternalRequirePlugin({
  external: ["react", "react-dom", "react-dom/client"],
})
```

## Steps to reproduce

1. Clone this repository
2. Run `pnpm install`
3. Run `node --run build`

## Expected Behavior

`react`, `react-dom`, `react-dom/client` are externalized as `esm` import.

## Actual Behavior

### `vite@8.0.0-beta.0`

`react`, `react-dom`, `react-dom/client` are not externalized.

<details>
<summary>vite.config.js</summary>

```js
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

```
</details>

```console
vite v8.0.0-beta.0 building client environment for production...
✓ 11 modules transformed.
dist-vite/index.html                0.67 kB │ gzip:  0.31 kB
dist-vite/assets/index-fxsvQSYl.js  489.83 kB │ gzip: 93.21 kB
✓ built in 63ms
```

### `rolldown@1.0.0-beta.53`

`react`, `react-dom`, `react-dom/client` are correctly externalized.

<details>
<summary>rolldown.config.js</summary>

```js
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

```
</details>

```js
import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";

//#region src/main.js
createRoot(document.getElementById("root")).render(createElement(StrictMode, null, createElement("div", null, "Hello World!")));
console.log("Hello World!");

//#endregion
```

## Linked Issues

- https://github.com/vitejs/rolldown-vite/issues/513
- https://github.com/vitejs/rolldown-vite/issues/541
