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

const kodeverk = {
  landkoder,
  sakstyper,
  behandlingstyper,
  behandlingsstatus,
  oppgavetyper,
};

exports.hentAlleKodeverk = (req, res) => {
  res.json(kodeverk);
};