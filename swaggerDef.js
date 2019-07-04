/* istanbul ignore next */
// This file is an example, it's not functionally used by the module.This

const host = `http://localhost:3001`;

module.exports = {
  info: {
    // API informations (required)
    title: 'Melosys Web Mock server', // Title (required)
    version: '0.1.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host, // Host (optional)
  basePath: '/', // Base path (optional)
};
