const { hentFagsak, avsluttsaksombortfalt, avslutt, henleggVideresend } = require('./fagsaker');
const { hentAktoerer, sendAktoer, slettAktoer } = require('./aktoerer');
const { henleggFagsak } = require('./henlegg');
const { sokFagsak }  = require('./sok');
const { hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');
const { opprett } = require('./opprett');

module.exports = {
  fagsak: {
    hent: hentFagsak,
    henlegg: { send: henleggFagsak},
    avsluttsaksombortfalt: { put: avsluttsaksombortfalt },
    avslutt: { put: avslutt },
    henleggVideresend: { send: henleggVideresend },
    opprett: { send: opprett }
  },
  aktoer: { hent: hentAktoerer, send: sendAktoer, slett: slettAktoer },
  sok: { hent: sokFagsak },
  kontaktopplysninger: {
    hent: hentKontaktopplysninger,
    send: sendKontaktopplysninger,
    slett: slettKontaktopplysninger
  },
};
