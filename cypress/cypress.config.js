const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    video: false,
  },

});
