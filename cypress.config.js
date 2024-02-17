const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video : true,
  //projectId: "s61npn",
  e2e: {
    setupNodeEvents(on, config) {      
    },
  },
});
