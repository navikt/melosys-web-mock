/**
 * Kodeverk/behandlingsstatus
 * @module
 */
const behandlingsstatus = [
  {
    kode: 'OPPRETTET',
    term: 'Opprettet',
  },
  {
    kode: 'UNDER_BEHANDLING',
    term: 'Under behandling',
  },
  {
    kode: 'AVSLUTTET',
    term: 'Avsluttet',
  },
  {
    kode: 'AVVENT_DOK_UTL',
    term: 'Avventer svar fra utenlandsk trygdemyndighet',
  },
  {
    kode: 'AVVENT_DOK_PART',
    term: 'Avventer svar fra part i saken',
  }
];
module.exports.behandlingsstatus = behandlingsstatus;
