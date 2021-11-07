/// <reference types="cypress" />
// const injectDevServer = require("@cypress/react/plugins/react-scripts");
const cracoConfig = require("../../craco.config.js");
const injectDevServer = require("@cypress/react/plugins/craco");
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  injectDevServer(on, config, cracoConfig);
  return config;
};
