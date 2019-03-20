const { lesFagsakerKatalog, hentFagsak, henleggFagsak, oppfriskFagsak } = require('./fagsaker');
const { lesAktoerKatalog, hentAktoerer, sendAktoer } = require('./aktoerer');
const { lesSokFagsakerKatalog, sokFagsak}  = require('./sok');
const { lesKontaktopplysningerKatalog, hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');
module.exports = {
  lesFagsakerKatalog,
  lesAktoerKatalog,
  lesSokFagsakerKatalog,
  lesKontaktopplysningerKatalog,
  fagsak: { hentFagsak, henleggFagsak, oppfriskFagsak },
  aktoer: { hentAktoerer, sendAktoer },
  sok: { sokFagsak },
  kontaktopplysninger: { hent: hentKontaktopplysninger, send: sendKontaktopplysninger, slett: slettKontaktopplysninger }
};
