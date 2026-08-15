import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://gabrielcf.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap(), react(), markdoc(), keystatic()],
  // Astro's built-in i18n config was deliberately dropped: with prefixDefaultLocale
  // true, its routing 404s ANY non-locale-prefixed path — including integration-
  // injected routes like /keystatic and /api/keystatic — before the router even
  // tries the manifest. Locale URLs already come for free from the src/pages/en|pt
  // folder structure, and locale switching / hreflang / RSS are all hand-rolled
  // (see Nav.astro, BaseLayout.astro), so none of Astro's i18n helpers were in use.
});
