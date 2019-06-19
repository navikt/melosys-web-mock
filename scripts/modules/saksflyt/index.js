const { endreperiode, fattet } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperioder');

module.exports = {
  vedtak: { endreperiode, fattet },
  unntaksperioder: { anmodning, godkjenn, innhentinfo, ikkegodkjenn }
};
