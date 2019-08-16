const { hentBehandling } = require('./behandling');
const { hentTidligereMedlemsPerioder, settTidligereMedlemsPerioder} = require('./tidligereMedlemsperioder');
const { hentBehandlingsResultat} = require('./behandlingsresultat');
const { sendStatus } = require('./behandlingsstatus');
module.exports = {
  behandling: { hent: hentBehandling },
  tidligeremedlemsperioder: { hent: hentTidligereMedlemsPerioder, send: settTidligereMedlemsPerioder },
  resultat: { hent: hentBehandlingsResultat },
  status: { send: sendStatus }
};
