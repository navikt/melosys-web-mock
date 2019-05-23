const { endreperiode, fattet } = require('./vedtak');
const { godkjenn, innhentinfo, ikkegodkjenn } = require('./unntaksperiode');

module.exports = {
  vedtak: { endreperiode, fattet },
  unntaksperiode: { godkjenn, innhentinfo, ikkegodkjenn }
};
