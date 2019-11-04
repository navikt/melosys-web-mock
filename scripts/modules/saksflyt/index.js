const { bestill, svar } = require('./anmodningsperioder');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { endre, fatt } = require('./vedtak');

module.exports = {
  anmodningsperioder: {
    bestill: { put: bestill },
    svar: { put: svar },
  },
  vedtak: {
    endre: {send: endre},
    fatt: {send: fatt},
  },
  unntaksperioder: {
    anmodning: {put: anmodning},
    godkjenn: {put: godkjenn},
    innhentinfo: {put: innhentinfo},
    ikkegodkjenn: {send: ikkegodkjenn},
  },
};
