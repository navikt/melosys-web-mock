const { sendAnmodningunntak} = require('./anmodningunntak');
const { sendUnntaksperiode } = require('./unntaksperioder');

module.exports = {
  anmodningunntak: { send: sendAnmodningunntak },
  unntaksperioder: { send: sendUnntaksperiode },
};
