const { hentRepresentantListe } = require('./liste');
const { hentRepresentant } = require('./representant');
const { hentValgtRepresentant, sendValgtRepresentant } = require('./valgt');

module.exports = {
  liste: { hent: hentRepresentantListe },
  representant: { hent: hentRepresentant },
  valgt: { hent: hentValgtRepresentant, send: sendValgtRepresentant },
};
