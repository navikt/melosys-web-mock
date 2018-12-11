/**
 * Kodeverk/behandlingsstatus
 * ref: https://confluence.adeo.no/display/TEESSI/Kodeverk+i+Melosys
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
  },
  {
    kode: 'ANMODNING_UNNTAK_SENDT',
    term: 'Anmodning om unntak er sendt',
  },
  {
    kode: 'VURDER_DOKUMENT',
    term: 'Nytt dokument mottatt på behandlingen',
  },
  {
    kode: 'TIDSFRIST_UTLOEPT',
    term: 'Tidsfristen er utløpt på etterspurte opplysninger',
  },
  {
    kode: 'FORELOEPIG_LOVVALG ',
    term: 'Avventer svar på foreløpig lovvalg',
  },
  {
    kode: 'IVERKSETTER_VEDTAK ',
    term: 'Vedtak iverksettes',
  }
];
module.exports.behandlingsstatus = behandlingsstatus;
