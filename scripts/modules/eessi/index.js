const { hentBucerUnderArbeid, opprett} = require('./bucer');
const { pdf } = require('./seder');
const { hent } = require('./mottakerinstitusjoner');
module.exports = {
  bucer: { hentBucerUnderArbeid, opprett: {send: opprett} },
  seder: { pdf, },
  mottakerinstitusjoner: { hent },
};
