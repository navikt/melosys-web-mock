const { hentBehandling } = require('./behandling');
const { hentTidligereMedlemsPerioder, settTidligereMedlemsPerioder} = require('./tidligereMedlemsperioder');
const { hentBehandlingsResultat} = require('./behandlingsresultat');
const { sendStatus } = require('./behandlingsstatus');
module.exports = {
  behandling: { hentBehandling },
  medlemsperioder: { hentMedlemsPerioder: hentTidligereMedlemsPerioder, settMedlemsPerioder: settTidligereMedlemsPerioder },
  resultat: { hentBehandlingsResultat },
  status: { sendStatus }
};
