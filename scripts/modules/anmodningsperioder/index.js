const { hent: hentPerioder, send: sendPerioder, lesAnmodningsKatalog } = require('./anmodningsperioder');
const { hent: hentSvar, send: sendSvar, lesAnmodningsSvarKatalog } = require('./svar');

module.exports = {
  hentPerioder, sendPerioder, lesAnmodningsKatalog,
  hentSvar, sendSvar, lesAnmodningsSvarKatalog
};
