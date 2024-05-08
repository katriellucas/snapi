import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify({
    edgeMiddleware: true,
    imageCDN: import.meta.env.PROD
  }),
  integrations: [
    icon({ include: { tabler: ['*'] }})
  ]
});