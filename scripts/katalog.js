const pathnameMap = {
  anmodningsperioder: {
    moduleName: 'anmodningsperioder',
    post: {
      pathname: '/anmodningsperioder/:behandlingID',
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
  },
  'eessi-bucer': {
    moduleName: 'eessi-bucer',
    post: {
      pathname: '/eessi/bucer/:behandlingID/opprett',
      params: {behandlingID: 4},
    },
    get: {
      pathname: '/eessi/bucer/:behandlingID',
      params: {behandlingID: 4},
    }
  },
  'eessi-mottakerinstitusjoner': {
    moduleName: 'eessi-mottakerinstitusjoner',
    get: {
      pathname: '/eessi/mottakerinstitusjoner/:bucType',
      params: {bucType: 'LA_BUC_01'},
    }
  },
  fagsaker: {
    moduleName: 'fagsaker',
    get: {
      pathname: '/fagsaker/:saksnummer',
      params: {saksnummer: 4}
    },
    post: {
      pathname: '/fagsaker/:fnr/henlegg',
      params: {fnr: '17117802280'}
    }
  },
  'fagsaker-aktoerer': {
    moduleName: 'fagsaker-aktoerer',
    get: {
      pathname: '/fagsaker/:saksnummer/aktoerer/?rolle=BRUKER&presenterer=BRUKER',
      params: {saksnummer: 4},
    },
    post: {
      pathname: '/fagsaker/:saksnummer/aktoerer',
      params: {saksnummer: 4},
    },
    delete: {
      pathname: '/fagsaker/aktoerer/:databaseid',
      params: { databaseid: 955006279357058}
    }
  },
  'fagsaker-kontaktopplysninger': {
    moduleName: 'fagsaker-kontaktopplysninger',
    get: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: {saksnummer: 3, juridiskorgnr: 810072512},
    },
    post: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: {saksnummer: 3, juridiskorgnr: 810072512},
    },
    delete: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: {saksnummer: 4, juridiskorgnr: 810072512}
    }
  },
  'fagsaker-sok': {
    moduleName: 'fagsaker-sok',
    get: {
      pathname: '/fagsaker/sok/?fnr=17117802280',
      params: {}
    }
  },
  inngang: {
    moduleName: 'inngang',
    get: {
      pathname: '/inngang/:snr',
      params: {snr: 4}
    }
  },
  'registrering-unntaksperioder': {
    moduleName: 'registrering-unntaksperioder',
    post: {
      pathname: '/registrering/:behandlingID/unntaksperioder',
      params: {behandlingID: 4}
    }
  },
  saksbehandler: {
    moduleName: 'saksbehandler',
    get: {
      pathname: '/saksbehandler'
    }
  },
  /* TODO
  saksopplysninger: {
    moduleName: 'saksopplysninger',
  },*/
  soknader: {
    moduleName: 'soknader',
    get: {
      pathname: '/soknader/:behandlingID',
      params: {behandlingID: 4}
    },
    post: {
      pathname: '/soknader/:behandlingID',
      params: {behandlingID: 4}
    }
  },
  vilkaar: {
    moduleName: 'vilkaar',
    get: {
      pathname: '/vilkaar/:behandlingID',
      params: {behandlingID: 4}
    },
    post: {
      pathname: '/vilkaar/:behandlingID',
      params: {behandlingID: 4}
    }
  }
};
const katalogMap = new Map([
  /*
  ['anmodningsperioder', pathnameMap.anmodningsperioder],
  ['anmodningsperioder-svar', pathnameMap["anmodningsperioder-svar"]],
  ['avklartefakta', pathnameMap.avklartefakta],
  ['behandlinger-behandling', pathnameMap["behandlinger-behandling"]],
  ['behandlinger-resultat', pathnameMap["behandlinger-resultat"]],
  ['behandlinger-status', pathnameMap["behandlinger-status"]],
  ['behandlinger-tidligeremedlemsperioder', pathnameMap["behandlinger-tidligeremedlemsperioder"]],
  ['dokumenter', pathnameMap.dokumenter],
  ['eessi-bucer', pathnameMap["eessi-bucer"]],
  ['eessi-mottakerinstitusjoner', pathnameMap["eessi-mottakerinstitusjoner"]],
  */
  //['fagsaker', pathnameMap.fagsaker],
  //['fagsaker-aktoerer', pathnameMap["fagsaker-aktoerer"]],
  //['fagsaker-kontaktopplysninger', pathnameMap["fagsaker-kontaktopplysninger"]],
  //['fagsaker-sok', pathnameMap["fagsaker-sok"]],
  //['inngang', pathnameMap.inngang],
  /*
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
  */
  ['registrering-unntaksperioder', pathnameMap['registrering-unntaksperioder']],
  //['soknader', pathnameMap.soknader],
  //['vilkaar', pathnameMap.vilkaar],
]);

module.exports = {
  pathnameMap,
  katalogMap,
};
