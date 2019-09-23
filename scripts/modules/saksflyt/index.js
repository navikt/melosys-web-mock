const { bestill, svar } = require('./anmodningsperioder');
const { videresend } = require('./soknader');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { endreperiode, fatt } = require('./vedtak');

module.exports = {
  anmodningsperioder: {
    bestill: { put: bestill },
    svar: { put: svar },
  },
  soknader: {
    videresend: { put: videresend },
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
