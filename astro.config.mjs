import image from "@astrojs/image";
import solidjs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://love-tolerance.com/",

  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    solidjs(),
  ],
});
