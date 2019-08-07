const pathnameMap = {
  anmodningsperioder: {
    moduleName: 'anmodningsperioder',
    get: {
      pathname: '/anmodningsperioder/:behandlingID',
      params: {behandlingID: 4}
    },
    post: {
      pathname: '/anmodningsperioder/:behandlingID',
      params: {behandlingID: 4}
    }
  },
  'anmodningsperioder-svar': {
    moduleName: 'anmodningsperioder-svar',
    get: {
      pathname: '/anmodningsperioder/:anmodningsperiodeID/svar',
      params: {anmodningsperiodeID: 4}
    },
    post: {
      pathname: '/anmodningsperioder/:anmodningsperiodeID/svar',
      params: {anmodningsperiodeID: 4}
    }
  },
  avklartefakta: {
    moduleName: 'avklartefakta',
    post: {
      pathname: '/avklartefakta/:behandlingID',
      params: {behandlingID: 3},
    }
  },
  'behandlinger': {
    moduleName: 'behandlinger',
    get: {
      pathname:'/behandlinger/:behandlingID',
      params: {behandlingID: 4},
    },
  },
  'behandlinger-resultat': {
    moduleName: 'behandlinger-resultat',
    get: {
      pathname: '/behandlinger/:behandlingID/resultat',
    },
  },
  'behandlinger-status': {
    moduleName: 'behandlinger-status',
    post: {
      pathname: '/behandlinger/:behandlingID/status',
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
  'dokumenter-opprett': {
    moduleName: 'dokumenter-opprett',
    post: {
      pathname: '/dokumenter/opprett/:behandlingID/:dokumenttypeKode',
      params: {behandlingID: 4, dokumentID: 4}
    }
  },
  'dokumenter-oversikt': {
    moduleName: 'dokumenter-oversikt',
    get: {
      pathname: '/dokumenter/oversikt/:saksnummer',
      params: {saksnummer: 4}
    }
  },
  'dokumenter-pdf': {
    moduleName: 'dokumenter-pdf',
    get: {
      pathname: '/dokumenter/pdf/:journalpostID/:dokumentID',
      params: {journalpostID: 321, dokumentID: 123}
    }
  },
  'dokumenter-utkast-pdf': {
    moduleName: 'dokumenter-utkast-pdf',
    post: {
      pathname: '/dokumenter/utkast/pdf/:behandlingID/:dokumenttypeKode',
      params: {behandlingID: 4, dokumenttypeKode:'MELDING_MANGLENDE_OPPLYSNINGER'},
    }
  },
  'eessi-bucer': {
    moduleName: 'eessi-bucer',
    get: {
      pathname: '/eessi/bucer/:behandlingID/?status=utkast',
      params: {behandlingID: 4},
    }
  },
  'eessi-bucer-opprett': {
    moduleName: 'eessi-bucer',
    post: {
      pathname: '/eessi/bucer/:behandlingID/opprett',
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
  'fagsaker-avsluttsaksombortfalt': {
    moduleName: 'fagsaker-avsluttsaksombortfalt',
    put: {
      pathname: '/fagsaker/:saksnummer/avsluttsaksombortfalt',
      params: {saksnummer: 4}
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
      pathname: '/journalforing/opprett',
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
  'lovvalgsperioder-opprinnelig': {
    moduleName: 'lovvalgsperioder-opprinnelig',
    get: {
      pathname: '/lovvalgsperioder/:behandlingID/opprinnelig',
      params: {behandlingID: 4}
    }
  },
  'oppgaver-oversikt': {
    moduleName: 'oppgaver-oversikt',
    get: {
      pathname: '/oppgaver/oversikt',
    }
  },
  'oppgaver-plukk': {
    moduleName: 'oppgaver-plukk',
    post: {
      pathname: '/oppgaver/plukk',
    }
  },
  'oppgaver-sok': {
    moduleName: 'oppgaver-sok',
    get: {
      pathname: '/oppgaver/sok/?fnr=17117802280',
    }
  },
  'oppgaver-tilbakelegg': {
    moduleName: 'oppgaver-tilbakelegg',
    post: {
      pathname: '/oppgaver/tilbakelegg',
    }
  },
  'organisasjoner': {
    moduleName: 'organisasjoner',
    get: {
      pathname: '/organisasjoner/?orgnr=810072512'
    }
  },
  'personer': {
    moduleName: 'personer',
    get: {
      pathname: '/personer/?fnr=17117802280'
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
  'saksopplysninger-oppfriskning': {
    moduleName: 'saksopplysninger-oppfriskning',
    get: {
      pathname: '/saksopplysninger/oppfriskning/:behandlingID',
      params: {behandlingID: 4}
    }
  },
  'saksopplysninger-oppfriskning-status': {
    moduleName: 'saksopplysninger-oppfriskning-status',
    get: {
      pathname: '/saksopplysninger/oppfriskning/:behandlingID/status',
      params: {behandlingID: 4}
    }
  },
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
  ['behandlinger', pathnameMap["behandlinger"]],
  ['behandlinger-resultat', pathnameMap["behandlinger-resultat"]],
  ['behandlinger-status', pathnameMap["behandlinger-status"]],
  ['behandlinger-tidligeremedlemsperioder', pathnameMap["behandlinger-tidligeremedlemsperioder"]],
  ['dokumenter-opprett', pathnameMap['dokumenter-opprett']],
  ['dokumenter-oversikt', pathnameMap['dokumenter-oversikt@']],
  ['dokumenter-pdf', pathnameMap['dokumenter-pdf']],
  ['dokumenter-utkast-pdf', pathnameMap['dokumenter-utkast-pdf']],
  ['eessi-bucer', pathnameMap["eessi-bucer"]],
  ['eessi-bucer-opprett', pathnameMap["eessi-bucer-opprett"]],
  ['eessi-mottakerinstitusjoner', pathnameMap["eessi-mottakerinstitusjoner"]],
  ['fagsaker', pathnameMap.fagsaker],
  ['fagsaker-aktoerer', pathnameMap["fagsaker-aktoerer"]],
  ['fagsaker-avsluttsaksombortfalt', pathnameMap["fagsaker-avsluttsaksombortfalt"]],
  ['fagsaker-kontaktopplysninger', pathnameMap["fagsaker-kontaktopplysninger"]],
  ['fagsaker-sok', pathnameMap["fagsaker-sok"]],
  ['inngang', pathnameMap.inngang],
  ['journalforing', pathnameMap.journalforing],
  ['journalforing-opprett', pathnameMap["journalforing-opprett"]],
  ['journalforing-tilordne', pathnameMap["journalforing-tilordne"]],
  ['lovvalgsperioder', pathnameMap.lovvalgsperioder],
  ['lovvalgsperioder-opprinnelig', pathnameMap['lovvalgsperioder-opprinnelig']],
  ['organisasjoner', pathnameMap.organisasjoner],
  ['personer', pathnameMap.personer],
  ['oppgaver-oversikt', pathnameMap["oppgaver-oversikt"]],
  ['oppgaver-plukk', pathnameMap["oppgaver-plukk"]],
  ['oppgaver-reset', pathnameMap["oppgaver-reset"]],
  ['oppgaver-tilbakelegg', pathnameMap["oppgaver-tilbakelegg"]],
  ['registrering-unntaksperioder', pathnameMap['registrering-unntaksperioder']],
  ['saksbehandler', pathnameMap.saksbehandler],
  ['saksflyt-anmodningsperioder-bestill', pathnameMap['saksflyt-anmodningsperioder-bestill']],
  ['saksflyt-unntaksperioder-anmodning', pathnameMap['saksflyt-unntaksperioder-anmodning']],
  ['saksflyt-unntaksperioder-godkjenn', pathnameMap['saksflyt-unntaksperioder-godkjenn']],
  ['saksflyt-unntaksperioder-innhentinfo', pathnameMap['saksflyt-unntaksperioder-innhentinfo']],
  ['saksflyt-vedtak-fatte', pathnameMap['saksflyt-vedtak-fatte']],
  ['saksflyt-vedtak-endreperiode', pathnameMap['saksflyt-vedtak-endreperiode']],
  ['saksopplysninger-oppfriskning', pathnameMap['saksopplysninger-oppfriskning']],
  ['saksopplysninger-oppfriskning-status', pathnameMap['saksopplysninger-oppfriskning-status']],
  ['soknader', pathnameMap.soknader],
  ['vilkaar', pathnameMap.vilkaar],
]);

module.exports = {
  pathnameMap,
  katalogMap,
};
