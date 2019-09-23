const {hentAktoerer, sendAktoer, slettAktoer} = require('./aktoerer');
const {hentFagsak} = require('./fagsaker');
const {henlegg} = require('./henlegg/');
const {sokFagsak} = require('./sok');
const {hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger} = require('./kontaktopplysninger');

module.exports = {
  fagsak: {
    hent: hentFagsak,
    henlegg,
  },
  aktoer: {hent: hentAktoerer, send: sendAktoer, slett: slettAktoer},
  sok: {hent: sokFagsak},
  kontaktopplysninger: {
    hent: hentKontaktopplysninger,
    send: sendKontaktopplysninger,
    slett: slettKontaktopplysninger
  },
};
