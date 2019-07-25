const pathnameMap = {
  anmodningsperioder: {
    moduleName: 'anmodningsperioder',
    post: {
      pathname: '/anmodningsperioder/svar/:behandlingID',
      params: {behandlingID: 4}
    }
  },
  'anmodningsperioder-svar': {
    moduleName: 'anmodningsperioder-svar',
    post: {
      pathname: '/anmodningsperioder/svar/:anmodningsperiodeID',
      params: {anmodningsperiodeID: 4}
    }
  },
  avklartefakta: {
    moduleName: 'avklartefakta',
    post: {
      pathname: '/avklartefakta/:behandlingID',
      params: {behandlingID: 4},
    }
  },
  'behandlinger-behandling': {
    moduleName: 'behandlinger-behandling',
    post: null,
  },
  'behandlinger-resultat': {
    moduleName: 'behandlinger-resultat',
    post: null,
  },
  'behandlinger-status': {
    moduleName: 'behandlinger-status',
    post: {
      pathname:'/behandlinger/:behandlingID/status',
      params: {behandlingID: 4},
    }
  },
  'behandlinger-tidligeremedlemsperioder': {
    moduleName: 'behandlinger-tidligeremedlemsperioder',
    post: {
      pathname: '/behandlinger/:behandlingID/medlemsperioder',
      params: {behandlingID: 4},
    }
  },
  dokumenter: {
    moduleName: 'dokumenter',
    post: {
      pathname: '/dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode',
      params: {behandlingID: 4, dokumenttypeKode:'MELDING_MANGLENDE_OPPLYSNINGER'},
    }
  }
};
const katalogMap = new Map([
  ['anmodningsperioder', pathnameMap.anmodningsperioder],
  ['anmodningsperioder-svar', pathnameMap["anmodningsperioder-svar"]],
  ['avklartefakta', pathnameMap.avklartefakta],
  ['behandlinger-behandling', pathnameMap["behandlinger-behandling"]],
  ['behandlinger-resultat', pathnameMap["behandlinger-resultat"]],
  ['behandlinger-status', pathnameMap["behandlinger-status"]],
  ['behandlinger-tidligeremedlemsperioder', pathnameMap["behandlinger-tidligeremedlemsperioder"]],
  ['dokumenter', pathnameMap.dokumenter],
  ['eessi', {}],
  ['eessi-bucerunderarbeid',{}],
  ['eessi-mottakerinstitusjoner', {}],
  ['fagsaker', {}],
  ['fagsaker-aktoerer', {}],
  ['fagsaker-kontaktopplysninger', {}],
  ['fagsaker-sok', {}],
  ['inngang', {}],
  ['journalforing', {}],
  ['journalforing-opprett', {}],
  ['journalforing-tilordne', {}],
  ['lovvalgsperioder', {}],
  ['oppgaver', {}],
  ['oppgaver-plukk', {}],
  ['oppgaver-plukk-response', {}],
  ['oppgaver-sok', {}],
  ['opprinneligLovvalgsperiode', {}],
  ['organisasjoner', {}],
  ['personer', {}],
  ['saksbehandler', {}],
  ['saksflyt-anmodningsperioder', {}],
  ['saksflyt-unntaksperioder', {}],
  ['saksflyt-vedtak', {}],
  ['soknader', {}],
  ['vilkar', {}],
]);

module.exports = {
  pathnameMap,
  katalogMap,
};
