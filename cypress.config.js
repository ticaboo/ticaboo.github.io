const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3dwjpq",

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  ci: {
    baseUrl: "https://ticaboo.github.io/build",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  prod: {
    baseUrl: "https:/timermachine.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
