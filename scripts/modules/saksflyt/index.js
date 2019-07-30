const { endreperiode, fatte } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');
const { bestill } = require('./anmodningsperioder');

module.exports = {
  vedtak: { endreperiode, fatte },
  unntaksperioder: { anmodning, godkjenn, innhentinfo, ikkegodkjenn },
  anmodningsperioder: { bestill }
};
