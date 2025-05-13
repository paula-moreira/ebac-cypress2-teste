const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "43bfxn",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    video: false,
  },
});