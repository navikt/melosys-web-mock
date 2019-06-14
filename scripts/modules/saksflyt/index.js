const { endreperiode, fattet } = require('./vedtak');
const { anmodning, godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperiode');

module.exports = {
  vedtak: { endreperiode, fattet },
  unntaksperiode: { anmodning, godkjenn, innhentinfo, ikkegodkjenn }
};
