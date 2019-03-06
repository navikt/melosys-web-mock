const { lesOppgaveKatalog, hentPlukk, sendPlukk, opprett, oversikt, reset, tilbakelegg } = require('./oppgaver');
const { lesSokOppgaveKatalog, sok} = require('./sok');
module.exports = {
  lesOppgaveKatalog,
  lesSokOppgaveKatalog,
  hentPlukk, sendPlukk, opprett, oversikt, reset, tilbakelegg,
  sok,
};
