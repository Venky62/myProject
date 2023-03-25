import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    testIsolation:false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      url: 'https://frontend.spcluster.tk/',
    },
    viewportWidth: 1750,
    viewportHeight: 1080,
    defaultCommandTimeout: 6000,
  },
});
