import solidjs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://love-tolerance.com/",

  integrations: [svelte(), solidjs()],
  vite: {
    plugins: [yaml()],
  },
});
