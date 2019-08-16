const { endreperiode, fatt } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { bestill } = require('./anmodningsperioder');

module.exports = {
  vedtak: {
    endreperiode: {send: endreperiode},
    fatt: {send: fatt},
  },
  unntaksperioder: {
    anmodning: {put: anmodning},
    godkjenn: {put: godkjenn},
    innhentinfo: {put: innhentinfo},
    ikkegodkjenn: {send: ikkegodkjenn},
  },
  anmodningsperioder: {
    bestill: {put: bestill},
  },
};
