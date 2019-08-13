const { hent, send } = require('./lovvalgsperioder');
const { hentOpprinnelig } = require('./opprinnelig');

module.exports = {
  hent, send,
  opprinnelig: { hent: hentOpprinnelig}
};
