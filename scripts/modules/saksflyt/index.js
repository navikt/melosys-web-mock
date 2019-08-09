const { endreperiode, fatte } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { bestill } = require('./anmodningsperioder');

module.exports = {
  vedtak: {
    endreperiode: {send: endreperiode},
    fatte: {send: fatte},
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
