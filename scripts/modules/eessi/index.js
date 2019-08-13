const { hentBucerUnderArbeid, opprett} = require('./bucer');
const { hent } = require('./mottakerinstitusjoner');
module.exports = {
  bucer: { hentBucerUnderArbeid, opprett: {send: opprett} },
  mottakerinstitusjoner: { hent },
};
