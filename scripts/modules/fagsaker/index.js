const { hentFagsak, henleggFagsak, bortfall } = require('./fagsaker');
const { hentAktoerer, sendAktoer, slettAktoer } = require('./aktoerer');
const { sokFagsak }  = require('./sok');
const { hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');

module.exports = {
  fagsak: { hentFagsak, henleggFagsak, bortfall },
  aktoer: { hentAktoerer, sendAktoer, slettAktoer },
  sok: { sokFagsak },
  kontaktopplysninger: {
    hent: hentKontaktopplysninger,
    send: sendKontaktopplysninger,
    slett: slettKontaktopplysninger
  },
};
