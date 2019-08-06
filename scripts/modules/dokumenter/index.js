const { opprett } = require('./opprett');
const { oversikt } = require('./oversikt');
const { utkast } = require('./utkast');
const { hent } = require('./pdf');

module.exports = {
  dokument: {
    opprett,
    oversikt,
  },
  pdf: {
    utkast,
    hent,
  }
};
