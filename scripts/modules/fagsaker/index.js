const { lesFagsakerKatalog, hentFagsak, henleggFagsak, oppfriskFagsak , bortfall } = require('./fagsaker');
const { lesAktoerKatalog, hentAktoerer, sendAktoer, slettAktoer } = require('./aktoerer');
const { lesSokFagsakerKatalog, sokFagsak}  = require('./sok');
const { lesKontaktopplysningerKatalog, hentKontaktopplysninger, sendKontaktopplysninger, slettKontaktopplysninger } = require('./kontaktopplysninger');
module.exports = {
  lesFagsakerKatalog,
  lesAktoerKatalog,
  lesSokFagsakerKatalog,
  lesKontaktopplysningerKatalog,
  fagsak: { hentFagsak, henleggFagsak, oppfriskFagsak, bortfall },
  aktoer: { hentAktoerer, sendAktoer, slettAktoer },
  sok: { sokFagsak },
  kontaktopplysninger: { hent: hentKontaktopplysninger, send: sendKontaktopplysninger, slett: slettKontaktopplysninger }
};
