const landkoder = [
  {
    kode: 'BE',
    term: 'Belgia',
  },
  {
    kode: 'BG',
    term: 'Bulgaria',
  },
  {
    kode: 'DK',
    term: 'Danmark',
  },
  {
    kode: 'EE',
    term: 'Estland',
  },
  {
    kode: 'FI',
    term: 'Finland',
  },
  {
    kode: 'FR',
    term: 'Frankrike',
  },
  {
    kode: 'GR',
    term: 'Hellas',
  },
  {
    kode: 'IE',
    term: 'Irland',
  },
  {
    kode: 'IS',
    term: 'Island',
  },
  {
    kode: 'IT',
    term: 'Italia',
  },
  {
    kode: 'HR',
    term: 'Kroatia',
  },
  {
    kode: 'CY',
    term: 'Kypros',
  },
  {
    kode: 'LV',
    term: 'Latvia',
  },
  {
    kode: 'LI',
    term: 'Liechtenstein',
  },
  {
    kode: 'LT',
    term: 'Litauen',
  },
  {
    kode: 'LU',
    term: 'Luxembourg',
  },
  {
    kode: 'MT',
    term: 'Malta',
  },
  {
    kode: 'NL',
    term: 'Nederland',
  },
  {
    kode: 'NO',
    term: 'Norge',
  },
  {
    kode: 'PL',
    term: 'Polen',
  },
  {
    kode: 'PT',
    term: 'Portugal',
  },
  {
    kode: 'RO',
    term: 'Romania',
  },
  {
    kode: 'SK',
    term: 'Slovakia',
  },
  {
    kode: 'SI',
    term: 'Slovenia',
  },
  {
    kode: 'ES',
    term: 'Spania',
  },
  {
    kode: 'GB',
    term: 'Storbritannia',
  },
  {
    kode: 'SE',
    term: 'Sverige',
  },
  {
    kode: 'DE',
    term: 'Tyskland',
  },
  {
    kode: 'HU',
    term: 'Ungarn',
  },
  {
    kode: 'AT',
    term: 'Østerrike',
  },
];
exports.landkoder = landkoder;

const sakstyper = [
  {
    kode: 'EU_EOS',
    term: 'EU/EØS',
  },
  {
    kode: 'TRG_AVT',
    term: 'Trygdeavtale',
  },
  {
    kode: 'FLK_TRG',
    term: 'Folketrygd',
  },
];
exports.sakstyper = sakstyper;

const behandlingstyper = [
  {
    kode: 'SKND',
    term: 'Søknad',
  },
  {
    kode: 'UFM',
    term: 'Unntak medlemskap',
  },
  {
    kode: 'KLG',
    term: 'Klage',
  },
  {
    kode: 'REV',
    term: 'Revurdering',
  },
  {
    kode: 'ML_U',
    term: 'Melding fra utenlandsk myndighet',
  },
  {
    kode: 'PS_U',
    term: 'Påstand fra utenlandsk myndighet',
  },
];
exports.behandlingstyper = behandlingstyper;

const behandlingsstatus = [
  {
    kode: 'OPPR',
    term: 'Opprettet',
  },
  {
    kode: 'UBEH',
    term: 'Under behandling',
  },
  {
    kode: 'FORL',
    term: 'Foreløpig lovvalg',
  },
  {
    kode: 'AVSLU',
    term: 'Avsluttet',
  },
];
exports.behandlingsstatus = behandlingsstatus;

const dokumentkategorier = [
  {
    kode: 'B',
    term: 'Brev',
  },
  {
    kode: 'KS',
    term: 'Konverterte data fra system',
  },
  {
    kode: 'IS',
    term: 'Ikke tolkbart skjema',
  },
  {
    kode: 'VB',
    term: 'Vedtaksbrev',
  },
  {
    kode: 'PUBL_BLANKETT_EOS',
    term: 'Publikumsblankett EØS',
  },
  {
    kode: 'SOK',
    term: 'Søknad',
  },
  {
    kode: 'ES',
    term: 'Elektronisk skjema',
  },
  {
    kode: 'SED',
    term: 'Strukturert elektronisk dokument - EU/EØS',
  },
  {
    kode: 'KA',
    term: 'Klage eller anke',
  },
  {
    kode: 'IB',
    term: 'Informasjonsbrev',
  },
  {
    kode: 'KD',
    term: 'Konvertert fra elektronisk arkiv',
  },
  {
    kode: 'FORVALTNINGSNOTAT',
    term: 'Forvaltningsnotat',
  },
  {
    kode: 'ELEKTRONISK_DIALOG',
    term: 'Elektronisk dialog',
  },
  {
    kode: 'TS',
    term: 'Tolkbart skjema',
  },
];
exports.dokumentkategorier;

const dokumenttitler = [
  {
    kode: 'ARBF',
    term: 'Arbeidsforhold',
  },
  {
    kode: 'BKR_MEDL',
    term: 'Bekreftelse på medlemskap i folketrygden',
  },
  {
    kode: 'INNT_SKAT',
    term: 'Inntektsopplysninger',
  },
  {
    kode: 'MERK',
    term: 'Merknad til sak',
  },
  {
    kode: 'STUDIE_DOKUMENTASJON',
    term: 'Studiedokumentasjon',
  },
  {
    kode: 'SOK_MED',
    term: 'Søknad om medlemskap',
  },
  {
    kode: 'BEKR_UNNT_FRA_MEDL',
    term: 'Unntak',
  },
  {
    kode: 'ANNET',
    term: 'Annet (=fritekst)',
  },
];
exports.dokumenttitler = dokumenttitler;

const oppgavetyper = [
  {
    kode: 'BEH_SAK',
    term: 'Behandling'
  },
  {
    kode: 'JFR',
    term: 'Journalføring'
  }
];
exports.oppgavetyper = oppgavetyper;

const vedleggstitler = [
  {
    kode: 'TITTEL_1',
    term: 'Vedleggstittel 1',
  },
  {
    kode: 'TITTEL_2',
    term: 'Vedleggstittel 2',
  },
  {
    kode: 'ANNET',
    term: 'Annet...',
  },
];
exports.vedleggstitler = vedleggstitler;

const kodeverk = {
  behandlingstyper,
  behandlingsstatus,
  dokumentkategorier,
  dokumenttitler,
  landkoder,
  oppgavetyper,
  sakstyper,
  vedleggstitler
};

exports.hentKodeverk = (req, res) => {
  res.json(kodeverk);
};
