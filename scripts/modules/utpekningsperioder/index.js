const { hent: hentPerioder, send: sendPerioder } = require('./utpekningsperioder');

module.exports = {
  hent: hentPerioder, send: sendPerioder,
};
