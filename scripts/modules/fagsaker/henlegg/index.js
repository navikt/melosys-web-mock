const {avsluttsaksombortfalt, henleggFagsak, henleggVideresend} = require('./henlegg');

module.exports.henlegg = {
  send: henleggFagsak,
  avsluttsaksombortfalt: {put: avsluttsaksombortfalt},
  videresend: {put: henleggVideresend}
};
