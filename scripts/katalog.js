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
  journalforing: {
    moduleName: 'journalforing',
    get: {
      pathname: '/journalforing/:journalpostID',
      params: {journalpostID: 4}
    }
  },
  'journalforing-opprett': {
    moduleName: 'journalforing-opprett',
    post: {
      pathname: '/journalforing/opprett?a=a&b=b',
    }
  },
  'journalforing-tilordne': {
    moduleName: 'journalforing-tilordne',
    post: {
      pathname: '/journalforing/tilordne'
    }
  },
  'lovvalgsperioder': {
    moduleName: 'lovvalgsperioder',
    get: {
      pathname: '/lovvalgsperioder/:behandlingID',
      params: {behandlingID: 4}
    },
    post: {
      pathname: '/lovvalgsperioder/:behandlingID',
      params: {behandlingID: 4}
    }
  },
  'oppgaver-sok': {
    moduleName: 'oppgaver-sok',
    get: {
      pathname: '/oppgaver/sok',
    }
  },
  'oppgaver-plukk': {
    moduleName: 'oppgaver-plukk',
    get: {
      pathname: '/oppgaver/plukk',
    },
    post: {
      pathname: '/oppgaver/plukk',
    }
  },
  'oppgaver-oversikt': {
    moduleName: 'oppgaver-oversikt',
    get: {
      pathname: '/oppgaver/oversikt',
    }
  },
  'oppgaver-opprett': {
    moduleName: 'oppgaver-opprett',
    post: {
      pathname: '/oppgaver/opprett',
    }
  },
  'oppgaver-reset': {
    moduleName: 'oppgaver-reset',
    get: {
      pathname: '/oppgaver/reset',
    }
  },
  'oppgaver-tilbakelegge': {
    moduleName: 'oppgaver-tilbakelegge',
    post: {
      pathname: '/oppgaver/tilbakelegge',
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
  'saksflyt-anmodningsperioder-bestill': {
    moduleName: 'saksflyt-anmodningsperioder-bestill',
    put: {
      pathname: '/saksflyt/anmodningsperioder/:behandlingID/bestill',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-unntaksperioder-anmodning': {
    moduleName: 'saksflyt-unntaksperioder-anmodning',
    put: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/anmodning',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-unntaksperioder-godkjenn': {
    moduleName: 'saksflyt-unntaksperioder-godkjenn',
    put: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/godkjenn',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-unntaksperioder-ikkegodkjenn': {
    moduleName: 'saksflyt-unntaksperioder-ikkegodkjenn',
    post: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-unntaksperioder-innhentinfo': {
    moduleName: 'saksflyt-unntaksperioder-innhentinfo',
    put: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/innhentinfo',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-vedtak-fatte': {
    moduleName: 'saksflyt-vedtak-fatte',
    post: {
      pathname: '/saksflyt/vedtak/:behandlingID/fatte',
      params: {behandlingID: 4}
    }
  },
  'saksflyt-vedtak-endreperiode': {
    moduleName: 'saksflyt-vedtak-endreperiode',
    post: {
      pathname: '/saksflyt/vedtak/:behandlingID/endreperiode',
      params: {behandlingID: 4}
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
  ['fagsaker', pathnameMap.fagsaker],
  ['fagsaker-aktoerer', pathnameMap["fagsaker-aktoerer"]],
  ['fagsaker-kontaktopplysninger', pathnameMap["fagsaker-kontaktopplysninger"]],
  ['fagsaker-sok', pathnameMap["fagsaker-sok"]],
  ['inngang', pathnameMap.inngang],
  ['journalforing', pathnameMap.journalforing],
  ['journalforing-opprett', pathnameMap["journalforing-opprett"]],
  ['journalforing-tilordne', pathnameMap["journalforing-tilordne"]],
  ['lovvalgsperioder', pathnameMap.lovvalgsperioder],
  /*
  ['opprinneligLovvalgsperiode', {}],
  ['organisasjoner', {}],
  ['personer', {}],
  ['saksbehandler', {}],
  */
  ['oppgaver-opprett', pathnameMap["oppgaver-opprett"]],
  ['oppgaver-oversikt', pathnameMap["oppgaver-oversikt"]],
  ['oppgaver-plukk', pathnameMap["oppgaver-plukk"]],
  ['oppgaver-reset', pathnameMap["oppgaver-reset"]],
  ['oppgaver-sok', pathnameMap["oppgaver-sok"]],
  ['oppgaver-tilbakelegge', pathnameMap["oppgaver-tilbakelegge"]],

  ['saksflyt-anmodningsperioder-bestill', pathnameMap['saksflyt-unntaksperioder-bestill']],
  ['registrering-unntaksperioder', pathnameMap['registrering-unntaksperioder']],
  ['saksflyt-unntaksperioder-anmodning', pathnameMap['saksflyt-unntaksperioder-anmodning']],
  ['saksflyt-unntaksperioder-godkjenn', pathnameMap['saksflyt-unntaksperioder-godkjenn']],
  ['saksflyt-vedtak-fatte', pathnameMap['saksflyt-vedtak-fatte']],
  ['saksflyt-vedtak-endreperiode', pathnameMap['saksflyt-vedtak-endreperiode']],
  ['soknader', pathnameMap.soknader],
  ['vilkaar', pathnameMap.vilkaar],
]);

module.exports = {
  pathnameMap,
  katalogMap,
};
