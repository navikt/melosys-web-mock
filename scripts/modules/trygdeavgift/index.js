const { hentBeregning, sendBeregning } = require('./beregning');
const { hentGrunnlag, sendGrunnlag} = require('./grunnlag');

module.exports = {
  beregning: { hent: hentBeregning, send: sendBeregning },
  grunnlag: { hent: hentGrunnlag, send: sendGrunnlag },
};
