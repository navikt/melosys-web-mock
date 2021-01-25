const { hentAvklartefakta, sendAvklartefakta } = require('./avklartefakta');
const { hentOppsummering } = require('./oppsummering');
const { sendVirksomhet } = require('./virksomheter');
const { sendMedfolgendeFamilie } = require('./medfolgendefamilie');

module.exports = {
  avklartefakta: { hent: hentAvklartefakta, send: sendAvklartefakta },
  oppsummering: { hent: hentOppsummering },
  virksomhet: { send: sendVirksomhet },
  medfolgendeFamilie: { send: sendMedfolgendeFamilie },
};
