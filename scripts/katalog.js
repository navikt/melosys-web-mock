const pathnameMap = {
  anmodningsperioder: {
    moduleName: 'anmodningsperioder',
    get: {
      pathname: '/anmodningsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/anmodningsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  'anmodningsperioder-svar': {
    moduleName: 'anmodningsperioder-svar',
    get: {
      pathname: '/anmodningsperioder/:anmodningsperiodeID/svar',
      params: { anmodningsperiodeID: 4 },
    },
    post: {
      pathname: '/anmodningsperioder/:anmodningsperiodeID/svar',
      params: { anmodningsperiodeID: 4 },
    },
  },
  avklartefakta: {
    moduleName: 'avklartefakta',
    get: {
      pathname: '/avklartefakta/:behandlingID',
      params: { behandlingID: 3 },
    },
    post: {
      pathname: '/avklartefakta/:behandlingID',
      params: { behandlingID: 3 },
    },
  },
  'avklartefakta-virksomheter': {
    moduleName: 'avklartefakta-virksomheter',
    post: {
      pathname: '/avklartefakta/:behandlingID/virksomheter',
      params: { behandlingID: 2 },
    }
  },
  'avklartefakta-oppsummering' : {
    moduleName: 'avklartefakta-oppsummering',
    get: {
      pathname: '/avklartefakta/:behandlingID/oppsummering',
      params: { behandlingID: 2 },
    }
  },
  'avklartefakta-medfolgendefamilie' : {
    moduleName: 'avklartefakta-medfolgendefamilie',
    post: {
      pathname: '/avklartefakta/:behandlingID/medfolgendeFamilie',
      params: { behandlingID: 2 },
    }
  },
  'behandlinger-behandling': {
    moduleName: 'behandlinger-behandling',
    get: {
      pathname: '/behandlinger/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  'behandlinger-resultat': {
    moduleName: 'behandlinger-resultat',
    get: {
      pathname: '/behandlinger/:behandlingID/resultat',
      params: { behandlingID: 4 },
    },
  },
  'behandlinger-status': {
    moduleName: 'behandlinger-status',
    post: {
      pathname: '/behandlinger/:behandlingID/status',
      params: { behandlingID: 4 },
    },
  },
  'behandlinger-endrebehandlingsfrist': {
    moduleName: 'behandlinger-endrebehandlingsfrist',
    post: {
      pathname: '/behandlinger/:behandlingID/behandlingsfrist',
      params: { behandlingID: 4 },
    },
  },
  'behandlinger-tidligeremedlemsperioder': {
    moduleName: 'behandlinger-tidligeremedlemsperioder',
    get: {
      pathname: '/behandlinger/:behandlingID/tidligeremedlemsperioder',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/behandlinger/:behandlingID/tidligeremedlemsperioder',
      params: { behandlingID: 4 },
    },
  },
  'behandlinger-endrebehandlingstema': {
    moduleName: 'behandlinger-endrebehandlingstema',
    get: {
      pathname: '/behandlinger/:behandlingID/muligeBehandlingstema',
      params: {behandlingID: 4},
    },
    post: {
      pathname: '/behandlinger/:behandlingID/endreBehandlingstema',
      params: {behandlingID: 4},
    },
  },
  'behandlinger-behandlingsstatus': {
    moduleName: 'behandlinger-behandlingsstatus',
    get: {
      pathname: '/behandlinger/:behandlingID/muligeStatuser',
      params: {behandlingID: 4},
    },
  },
  behandlingsgrunnlag: {
    moduleName: 'behandlingsgrunnlag',
    get: {
      pathname: '/behandlingsgrunnlag/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/behandlingsgrunnlag/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  'dokumenter-opprett': {
    moduleName: 'dokumenter-opprett',
    post: {
      pathname: '/dokumenter/opprett/:behandlingID/:produserbartDokument',
      params: { behandlingID: 4, produserbartDokument: 'ATTEST_A1' },
    },
  },
  'dokumenter-oversikt': {
    moduleName: 'dokumenter-oversikt',
    get: {
      pathname: '/dokumenter/oversikt/:saksnummer',
      params: { saksnummer: 4 },
    },
  },
  'dokumenter-pdf': {
    moduleName: 'dokumenter-pdf',
    get: {
      pathname: '/dokumenter/pdf/:journalpostID/:dokumentID',
      params: { journalpostID: 321, dokumentID: 123 },
    },
  },
  'dokumenter-pdf-utkast-brev': {
    moduleName: 'dokumenter-pdf-utkast-brev',
    post: {
      pathname: '/dokumenter/pdf/brev/utkast/:behandlingID/:produserbartDokument',
      params: { behandlingID: 4, produserbartDokument: 'MELDING_MANGLENDE_OPPLYSNINGER' },
    },
  },
  'dokumenter-pdf-utkast-sed': {
    moduleName: 'dokumenter-pdf-utkast-sed',
    post: {
      pathname: '/dokumenter/pdf/sed/utkast/:behandlingID/:sedType',
      params: { behandlingID: 4, sedType: 'A001' },
    }
  },
  'dokumenter-v2-mulige-mottakere': {
    moduleName: 'dokumenter-v2-mulige-mottakere',
    post: {
      pathname: '/dokumenter/v2/mulige-mottakere/:behandlingID',
      params: { behandlingID: 2 }
    },
  },
  'dokumenter-v2-tilgjengelige-maler': {
    moduleName: 'dokumenter-v2-tilgjengelige-maler',
    get: {
      pathname: '/dokumenter/v2/tilgjengelige-maler/:behandlingID',
      params: { behandlingID: 2 }
    },
  },
  'dokumenter-v2-opprett': {
    moduleName: 'dokumenter-v2-opprett',
    post: {
      pathname: '/dokumenter/v2/opprett/:behandlingID',
      params: { behandlingID: 2 },
    },
  },
  'dokumenter-v2-utkast': {
    moduleName: 'dokumenter-v2-utkast',
    post: {
      pathname: '/dokumenter/v2/pdf/brev/utkast/:behandlingID',
      params: { behandlingID: 2 },
    },
  },
  'eessi-bucer': {
    moduleName: 'eessi-bucer',
    get: {
      pathname: '/eessi/bucer/:behandlingID/?status=utkast',
      params: { behandlingID: 4 },
    },
  },
  'eessi-bucer-opprett': {
    moduleName: 'eessi-bucer',
    post: {
      pathname: '/eessi/bucer/:behandlingID/opprett',
      params: { behandlingID: 4 },
    },
  },
  'eessi-mottakerinstitusjoner': {
    moduleName: 'eessi-mottakerinstitusjoner',
    get: {
      pathname: '/eessi/mottakerinstitusjoner/:bucType',
      params: { bucType: 'LA_BUC_01' },
    },
  },
  fagsaker: {
    moduleName: 'fagsaker',
    get: {
      pathname: '/fagsaker/:saksnummer',
      params: { saksnummer: 4 },
    },
  },
  'fagsaker-aktoerer': {
    moduleName: 'fagsaker-aktoerer',
    get: {
      pathname: '/fagsaker/:saksnummer/aktoerer/?rolle=BRUKER&presenterer=BRUKER',
      params: { saksnummer: 4 },
    },
    post: {
      pathname: '/fagsaker/:saksnummer/aktoerer',
      params: { saksnummer: 4 },
    },
    delete: {
      pathname: '/fagsaker/aktoerer/:databaseid',
      params: { databaseid: 955006279357058 },
    },
  },
  'fagsaker-avsluttsaksombortfalt': {
    moduleName: 'fagsaker-avsluttsaksombortfalt',
    put: {
      pathname: '/fagsaker/:saksnummer/avsluttsaksombortfalt',
      params: { saksnummer: 4 },
    },
  },
  'fagsaker-avslutt': {
    moduleName: 'fagsaker-avslutt',
    put: {
      pathname: '/fagsaker/:saksnummer/avslutt',
      params: { saksnummer: 4 },
    },
  },
  'fagsaker-henlegg': {
    moduleName: 'fagsaker-henlegg',
    post: {
      pathname: '/fagsaker/:fnr/henlegg',
      params: { fnr: '17117802280' },
    },
  },
  'fagsaker-kontaktopplysninger': {
    moduleName: 'fagsaker-kontaktopplysninger',
    get: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: { saksnummer: 3, juridiskorgnr: 810072512 },
    },
    post: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: { saksnummer: 3, juridiskorgnr: 810072512 },
    },
    delete: {
      pathname: '/fagsaker/:saksnummer/kontaktopplysninger/:juridiskorgnr',
      params: { saksnummer: 4, juridiskorgnr: 810072512 },
    },
  },
  'fagsaker-notater': {
    moduleName: 'fagsaker-notater',
    get: {
      pathname: '/fagsaker/:saksnummer/notater',
      params: { saksnummer: 4 },
    },
    post: {
      pathname: '/fagsaker/:saksnummer/notater',
      params: { saksnummer: 4 },
    },
    put: {
      pathname: 'fagsaker/:saksnummer/notater/:notatid',
      params: { saksnummer: 4, notatid: 1 },
    },
  },
  'fagsaker-opprett': {
    moduleName: 'fagsaker-opprett',
    post: {
      pathname: '/fagsaker/opprett',
    },
  },
  'fagsaker-revurder': {
    moduleName: 'fagsaker-revurder',
    post: {
      pathname: '/fagsaker/:saksnummer/revurder',
      params: { saksnummer: 4 },
    },
  },
  'fagsaker-sok': {
    moduleName: 'fagsaker-sok',
    post: {
      pathname: '/fagsaker/sok',
      params: {
        ident: 17117802280,
        saksnummer: 4,
      },
    },
  },
  'fagsaker-utpek': {
    moduleName: 'fagsaker-utpek',
    post: {
      pathname: '/fagsaker/:saksnummer/utpek',
      params: {},
    },
  },
  journalforing: {
    moduleName: 'journalforing',
    get: {
      pathname: '/journalforing/:journalpostID',
      params: { journalpostID: 'DOK_3789' },
    },
  },
  'journalforing-opprett': {
    moduleName: 'journalforing-opprett',
    post: {
      pathname: '/journalforing/opprett',
    },
  },
  'journalforing-sed': {
    moduleName: 'journalforing-sed',
    post: {
      pathname: '/journalforing/sed',
    },
  },
  'journalforing-tilordne': {
    moduleName: 'journalforing-tilordne',
    post: {
      pathname: '/journalforing/tilordne',
    },
  },
  'kodeverk-melosys-internt-folketrygden': {
    moduleName: 'kodeverk-melosys-internt-folketrygden',
    get: {
      pathname: '/kodeverk/melosys-internt/folketrygden',
    },
  },
  'kodeverk-nav-felles-hentkodeverk': {
    moduleName: 'kodeverk-nav-felles-hentkodeverk',
    get: {
      pathname: '/kodeverk/nav-felles/:kodeverknavn',
      params: { kodeverknavn: 'LANDKODERISO2' },
    },
  },
  lovvalgsperioder: {
    moduleName: 'lovvalgsperioder',
    get: {
      pathname: '/lovvalgsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/lovvalgsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  'lovvalgsperioder-opprinnelig': {
    moduleName: 'lovvalgsperioder-opprinnelig',
    get: {
      pathname: '/lovvalgsperioder/:behandlingID/opprinnelig',
      params: { behandlingID: 4 },
    },
  },
  'medlemskapsperioder': {
    moduleName: 'medlemskapsperioder',
    get: {
      pathname: '/behandlinger/:behandlingID/medlemskapsperioder',
      params: { behandlingID: 2 },
    },
    post: {
      pathname: '/behandlinger/:behandlingID/medlemskapsperioder',
      params: { behandlingID: 2 },
    },
    put: {
      pathname: '/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID',
      params: { behandlingID: 2, medlemskapsperiodeID: 2 },
    },
    delete: {
      pathname: '/behandlinger/:behandlingID/medlemskapsperioder/:medlemskapsperiodeID',
      params: { behandlingID: 2, medlemskapsperiodeID: 2 },
    },
  },
  'medlemskapsperioder-bestemmelse': {
    moduleName: 'medlemskapsperioder-bestemmelse',
    get: {
      pathname: '/behandlinger/medlemskapsperioder/bestemmelser',
    },
    post: {
      pathname: '/behandlinger/:behandlingID/medlemskapsperioder/bestemmelser',
      params: { behandlingID: 2},
    },
  },
  'oppgaver-oversikt': {
    moduleName: 'oppgaver-oversikt',
    get: {
      pathname: '/oppgaver/oversikt',
    },
  },
  'oppgaver-plukk': {
    moduleName: 'oppgaver-plukk',
    post: {
      pathname: '/oppgaver/plukk',
    },
  },
  'oppgaver-tilbakelegg': {
    moduleName: 'oppgaver-tilbakelegg',
    post: {
      pathname: '/oppgaver/tilbakelegg',
    },
  },
  'oppgaver-sok': {
    moduleName: 'oppgaver-sok',
    get: {
      pathname: '/oppgaver/sok/?fnr=17117802280',
    },
  },
  organisasjoner: {
    moduleName: 'organisasjoner',
    get: {
      pathname: '/organisasjoner/:orgnr',
      params: { orgnr: '810072512' },
    },
  },
  personer: {
    moduleName: 'personer',
    get: {
      pathname: '/personer/:fnr',
      params: { fnr: '17117802280' },
    },
  },
  'representant-liste': {
    moduleName: 'representant-liste',
    get: {
      pathname: '/representant/liste',
    },
  },
  'representant-representant': {
    moduleName: 'representant-representant',
    get: {
      pathname: '/representant/:representantID',
      params: { representantID: '99999' },
    },
  },
  'representant-valgt': {
    moduleName: 'representant-valgt',
    get: {
      pathname: '/representant/valgt/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/representant/valgt/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  saksbehandler: {
    moduleName: 'saksbehandler',
    get: {
      pathname: '/saksbehandler',
    },
  },
  'saksflyt-anmodningsperioder-bestill': {
    moduleName: 'saksflyt-anmodningsperioder-bestill',
    post: {
      pathname: '/saksflyt/anmodningsperioder/:behandlingID/bestill',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-anmodningsperioder-svar': {
    moduleName: 'saksflyt-anmodningsperioder-svar',
    post: {
      pathname: '/saksflyt/anmodningsperioder/:behandlingID/svar',
      params: { behandlingID: 4 },
    },
  },
  'fagsaker-henleggvideresend': {
    moduleName:'fagsaker-henleggvideresend',
    post: {
      pathname: '/fagsaker/:saksnummer/henlegg-videresend',
      params: { saksnummer: 4 },
    },
  } ,
  'saksflyt-unntaksperioder-godkjenn': {
    moduleName: 'saksflyt-unntaksperioder-godkjenn',
    post: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/godkjenn',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-unntaksperioder-ikkegodkjenn': {
    moduleName: 'saksflyt-unntaksperioder-ikkegodkjenn',
    post: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/ikkegodkjenn',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-unntaksperioder-innhentinfo': {
    moduleName: 'saksflyt-unntaksperioder-innhentinfo',
    put: {
      pathname: '/saksflyt/unntaksperioder/:behandlingID/innhentinfo',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-utpeking-avvis': {
    moduleName: 'saksflyt-utpeking-avvis',
    post: {
      pathname: '/saksflyt/utpeking/:behandlingID/avvis',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-vedtak-fatt': {
    moduleName: 'saksflyt-vedtak-fatt',
    post: {
      pathname: '/saksflyt/vedtak/:behandlingID/fatt',
      params: { behandlingID: 4 },
    },
  },
  'saksflyt-vedtak-endre': {
    moduleName: 'saksflyt-vedtak-endre',
    post: {
      pathname: '/saksflyt/vedtak/:behandlingID/endre',
      params: { behandlingID: 4 },
    },
  },
  'saksopplysninger-oppfriskning': {
    moduleName: 'saksopplysninger-oppfriskning',
    get: {
      pathname: '/saksopplysninger/oppfriskning/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  statistikk: {
    moduleName: 'statistikk',
    get: {
      pathname: '/statistikk',
    },
  },
  'trygdeavgift-beregning': {
    moduleName: 'trygdeavgift-beregning',
    get: {
      pathname: '/behandlinger/:behandlingID/trygdeavgift/beregning',
      params: { behandlingID: 2 },
    },
    put: {
      pathname: '/behandlinger/:behandlingID/trygdeavgift/beregning',
      params: { behandlingID: 2 },
    },
  },
  'trygdeavgift-grunnlag': {
    moduleName: 'trygdeavgift-grunnlag',
    get: {
      pathname: '/behandlinger/:behandlingID/trygdeavgift/grunnlag',
      params: { behandlingID: 2 },
    },
    put: {
      pathname: '/behandlinger/:behandlingID/trygdeavgift/grunnlag',
      params: { behandlingID: 2 },
    },
  },
  utpekingsperioder: {
    moduleName: 'utpekingsperioder',
    get: {
      pathname: '/utpekingsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/utpekingsperioder/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  vilkaar: {
    moduleName: 'vilkaar',
    get: {
      pathname: '/vilkaar/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/vilkaar/:behandlingID',
      params: { behandlingID: 4 },
    },
  },
  'vilkaar-inngangsvilkaar-overstyr': {
    moduleName: 'vilkaar-inngangsvilkaar-overstyr',
    put: {
      pathname: 'vilkaar/:behandlingID/inngangsvilkaar/overstyr',
      params: { behandlingID: 4 },
    },
  }
};

const katalog = [];
for (const path in pathnameMap) {
  const strings = [path, pathnameMap[path]];
  katalog.push(strings);
}
const katalogMap = new Map(katalog);
module.exports = {
  pathnameMap,
  katalogMap,
};
