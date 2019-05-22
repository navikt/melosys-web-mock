const { lesBehandlingKatalog, hentBehandling } = require('./behandling');
const { lesTidligereMedlemsPerioderKatalog, hentTidligereMedlemsPerioder, settTidligereMedlemsPerioder} = require('./tidligereMedlemsperioder');
const { lesBehandlingsresultatKatalog, hentBehandlingsResultat} = require('./behandlingsresultat');
const { sendStatus } = require('./behandlingsstatus');
module.exports = {
  lesBehandlingKatalog,
  lesTidligereMedlemsPerioderKatalog,
  lesBehandlingsresultatKatalog,
  behandling: { hentBehandling },
  medlemsperioder: { hentMedlemsPerioder: hentTidligereMedlemsPerioder, settMedlemsPerioder: settTidligereMedlemsPerioder },
  resultat: { lesBehandlingsresultatKatalog, hentBehandlingsResultat },
  status: { sendStatus }
};
