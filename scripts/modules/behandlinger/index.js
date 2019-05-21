const { lesBehandlingKatalog, hentBehandling } = require('./behandling');
const { lesBehandlingsPerioderKatalog, hentMedlemsPerioder, settMedlemsPerioder} = require('./behandlingsperioder');
const { lesBehandlingsresultatKatalog, hentBehandlingsResultat} = require('./behandlingsresultat');
const { sendStatus } = require('./behandlingsstatus');
module.exports = {
  lesBehandlingKatalog,
  lesBehandlingsPerioderKatalog,
  lesBehandlingsresultatKatalog,
  behandling: { hentBehandling },
  perioder: { hentMedlemsPerioder, settMedlemsPerioder },
  resultat: { lesBehandlingsresultatKatalog, hentBehandlingsResultat },
  status: { sendStatus }
};
