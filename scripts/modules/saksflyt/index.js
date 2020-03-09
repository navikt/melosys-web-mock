const { bestill, svar } = require('./anmodningsperioder');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { avvis } = require('./utpeking');
const { endre, fatt, revurder } = require('./vedtak');

module.exports = {
  anmodningsperioder: {
    bestill: { post: bestill },
    svar: { put: svar },
  },
  vedtak: {
    endre: {send: endre},
    fatt: {send: fatt},
    revurder: {send: revurder}
  },
  unntaksperioder: {
    anmodning: {put: anmodning},
    godkjenn: {put: godkjenn},
    innhentinfo: {put: innhentinfo},
    ikkegodkjenn: {send: ikkegodkjenn},
  },
  utpeking: {
    avvis: { send: avvis },
  }
};
