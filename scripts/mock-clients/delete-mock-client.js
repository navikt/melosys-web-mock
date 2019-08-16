const MockClient = require('./mock-client');

const oppsummering = {
  success: 0,
  failure: 0,
};

MockClient.testAll('delete', oppsummering);
