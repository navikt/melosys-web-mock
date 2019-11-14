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
  behandlinger: {
    moduleName: 'behandlinger',
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
    get: {
      pathname: '/dokumenter/pdf/sed/utkast/:behandlingID/:sedType',
      params: { behandlingID: 4, sedType: 'A001' },
    }
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
  'fagsaker-sok': {
    moduleName: 'fagsaker-sok',
    get: {
      pathname: '/fagsaker/sok/?fnr=17117802280',
      params: {},
    },
  },
  inngangsvilkaar: {
    moduleName: 'inngangsvilkaar',
    get: {
      pathname: '/inngangsvilkaar/:snr',
      params: { snr: 3 },
    },
  },
  journalforing: {
    moduleName: 'journalforing',
    get: {
      pathname: '/journalforing/:journalpostID',
      params: { journalpostID: 4 },
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
    put: {
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
    put: {
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
  'saksopplysninger-oppfriskning-status': {
    moduleName: 'saksopplysninger-oppfriskning-status',
    get: {
      pathname: '/saksopplysninger/oppfriskning/:behandlingID/status',
      params: { behandlingID: 4 },
    },
  },
  soknader: {
    moduleName: 'soknader',
    get: {
      pathname: '/soknader/:behandlingID',
      params: { behandlingID: 4 },
    },
    post: {
      pathname: '/soknader/:behandlingID',
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
