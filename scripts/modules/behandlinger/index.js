const { hentBehandling } = require('./behandling');
const { hentTidligereMedlemsPerioder, settTidligereMedlemsPerioder} = require('./tidligereMedlemsperioder');
const { hentBehandlingsResultat} = require('./behandlingsresultat');
const { hentMuligeBehandlingsstatuser, sendStatus } = require('./behandlingsstatus');
const { hentMuligeBehandlingstema, endreBehandlingstema} = require('./endreBehandlingstema');

module.exports = {
  behandling: { hent: hentBehandling },
  tidligeremedlemsperioder: { hent: hentTidligereMedlemsPerioder, send: settTidligereMedlemsPerioder },
  resultat: { hent: hentBehandlingsResultat },
  status: { hent: hentMuligeBehandlingsstatuser, send: sendStatus },
  endreBehandlingstema: {hent: hentMuligeBehandlingstema, send: endreBehandlingstema}
};
