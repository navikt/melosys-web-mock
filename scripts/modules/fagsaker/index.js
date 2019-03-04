const { lesFagsakerKatalog, hentFagsak, henleggFagsak, oppfriskFagsak } = require('./fagsaker');
const { lesAktoerKatalog, hentAktoerer, sendAktoer } = require('./aktoerer');
module.exports = {
  lesFagsakerKatalog,
  lesAktoerKatalog,
  fagsak: { hentFagsak, henleggFagsak, oppfriskFagsak },
  aktoer: { hentAktoerer, sendAktoer },
};
