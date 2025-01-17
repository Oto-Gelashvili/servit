import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://servit.vercel.app',
    setupNodeEvents(on, config) {},
  },
});
