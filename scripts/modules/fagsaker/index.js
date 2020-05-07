const { hentFagsak, avsluttsaksombortfalt, avslutt, henleggVideresend } = require('./fagsaker');
const { hentAktoerer, sendAktoer, slettAktoer } = require('./aktoerer');
const { henleggFagsak } = require('./henlegg');
const { hentNotater, opprettNotat, oppdaterNotat } = require('./notater');
const { sokFagsak }  = require('./sok');
const { hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');
const { opprett } = require('./opprett');
const { utpek } = require('./utpek');
const { revurder } = require('./revurder');

module.exports = {
  fagsak: {
    hent: hentFagsak,
    henlegg: { send: henleggFagsak},
    avsluttsaksombortfalt: { put: avsluttsaksombortfalt },
    avslutt: { put: avslutt },
    henleggVideresend: { send: henleggVideresend },
    opprett: { send: opprett },
    revurder: { send: revurder },
    utpek: { send: utpek },
  },
  aktoer: { hent: hentAktoerer, send: sendAktoer, slett: slettAktoer },
  notater: { hent: hentNotater, send: opprettNotat, put: oppdaterNotat },
  sok: { hent: sokFagsak },
  kontaktopplysninger: {
    hent: hentKontaktopplysninger,
    send: sendKontaktopplysninger,
    slett: slettKontaktopplysninger
  },
};
