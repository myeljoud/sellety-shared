import { defineConfig, Options } from "tsup";

const commonConfig: Options = {
  minify: true,
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
};

export default defineConfig([
  {
    ...commonConfig,
    entry: ["src/index.ts"],
    outDir: "dist",
  },
  {
    ...commonConfig,
    entry: ["src/shopify/index.ts"],
    outDir: "shopify",
  },
  {
    ...commonConfig,
    entry: ["src/sanity/index.ts"],
    outDir: "sanity",
  },
  {
    ...commonConfig,
    entry: ["src/firebase/index.ts"],
    outDir: "firebase",
  },
]);
