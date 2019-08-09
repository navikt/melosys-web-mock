const { hentFagsak, henleggFagsak, avsluttsaksombortfalt } = require('./fagsaker');
const { hentAktoerer, sendAktoer, slettAktoer } = require('./aktoerer');
const { sokFagsak }  = require('./sok');
const { hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');

module.exports = {
  fagsak: { hent: hentFagsak, henlegg: { send: henleggFagsak}, avsluttsaksombortfalt: {put: avsluttsaksombortfalt} },
  aktoer: { hent: hentAktoerer, send: sendAktoer, slett: slettAktoer },
  sok: { hent: sokFagsak },
  kontaktopplysninger: {
    hent: hentKontaktopplysninger,
    send: sendKontaktopplysninger,
    slett: slettKontaktopplysninger
  },
};
