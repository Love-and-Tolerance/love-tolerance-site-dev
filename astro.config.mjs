import solidjs from "@astrojs/solid-js";
import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://love-tolerance.com/",

  integrations: [solidjs()],
  vite: {
    plugins: [yaml()],
  },
});
