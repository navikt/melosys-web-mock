const { hent: hentPerioder, send: sendPerioder } = require('./anmodningsperioder');
const { hent, send } = require('./svar');

module.exports = {
  hent: hentPerioder, send: sendPerioder,
  svar: {hent, send}
};
