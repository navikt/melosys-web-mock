const { bestill } = require('./anmodningsperioder');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { endreperiode, fatt } = require('./vedtak');

module.exports = {
  anmodningsperioder: {
    bestill: { put: bestill },
  },
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
};
