const { endreperiode, fattet } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { send, hent } = require('./anmodningsperioder');

module.exports = {
  vedtak: { endreperiode, fattet },
  unntaksperioder: { anmodning, godkjenn, innhentinfo, ikkegodkjenn },
  anmodningsperioder: { send, hent }
};
