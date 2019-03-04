const { lesFagsakerKatalog, hentFagsak, henleggFagsak, oppfriskFagsak } = require('./fagsaker');
const { lesAktoerKatalog, hentAktoerer, sendAktoer } = require('./aktoerer');
 const { lesSokFagsakerKatalog, sokFagsak}  = require('./sok');
module.exports = {
  lesFagsakerKatalog,
  lesAktoerKatalog,
  lesSokFagsakerKatalog,
  fagsak: { hentFagsak, henleggFagsak, oppfriskFagsak },
  aktoer: { hentAktoerer, sendAktoer },
  sok: { sokFagsak },
};
