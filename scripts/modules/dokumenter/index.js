const { opprett } = require('./opprett');
const { oversikt } = require('./oversikt');
const { utkast, sedPdf } = require('./utkast');
const { hent } = require('./pdf');

module.exports = {
  dokument: {
    opprett: { send: opprett},
    oversikt: { hent: oversikt},
  },
  pdf: {
    utkast: { send: utkast, hentSed: sedPdf },
    hent,
  }
};
