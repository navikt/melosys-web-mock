const { opprett } = require('./opprett');
const { oversikt } = require('./oversikt');
const { utkast } = require('./utkast/brev');
const { sedPdf } = require('./utkast/sed');
const { hent } = require('./pdf');

module.exports = {
  dokument: {
    opprett: { send: opprett},
    oversikt: { hent: oversikt},
  },
  pdf: {
    brev: {
      utkast: { send: utkast }
    },
    sed: {
      utkast: { hent: sedPdf }
    },
    hent,
  }
};
