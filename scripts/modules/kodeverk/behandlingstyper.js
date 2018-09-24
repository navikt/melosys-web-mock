/**
 * Kodeverk/behandlingstyper
 * @module
 */
const behandlingstyper = [
  {
    kode: 'SOEKNAD',
    term: 'Behandling av søknad'
  },
  {
    kode: 'KLAGE',
    term: 'Behandling av klage eller anke'
  },
  {
    kode: 'NORGE_UTPEKT',
    term: 'Behandling av at Norge er utpekt fra utenlandske myndigheter'
  },
  {
    kode: 'PAASTAND_UTL',
    term: 'Behandling av påstand fra utenlandske myndigheter'
  },
  {
    kode: 'POSTING_UTL',
    term: 'Behandling av melding om posting fra utenlandske myndigheter'
  },
  {
    kode: 'REVURDERING',
    term: 'Behandling av revurdering av et tidligere vedtak'
  }
];
module.exports.behandlingstyper = behandlingstyper;
