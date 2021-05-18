const { bestill, svar } = require('./anmodningsperioder');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { avvis } = require('./utpeking');
const { endre, fatt } = require('./vedtak');

module.exports = {
  anmodningsperioder: {
    bestill: { post: bestill },
    svar: { post: svar },
  },
  vedtak: {
    endre: {send: endre},
    fatt: {send: fatt},
  },
  unntaksperioder: {
    anmodning: {put: anmodning},
    godkjenn: {send: godkjenn},
    innhentinfo: {put: innhentinfo},
    ikkegodkjenn: {send: ikkegodkjenn},
  },
  utpeking: {
    avvis: { send: avvis },
  }
};
