/**
 * Kodeverk/saksstatuser
 * ref: https://confluence.adeo.no/display/TEESSI/Kodeverk+i+Melosys
 * Dato: 13SEP2018, Marte Okkelmo
 * Oppdatert: 12NOV2018, Marte Okkelmo
 * @module
 */
const saksstatuser = [
  {
    kode: 'OPPRETTET',
    term: 'Saken har blitt opprettet men behandlingen har ikke startet eller er ikke ferdigstilt ennå.'
  },
  {
    kode: 'LOVVALG_AVKLART',
    term: 'Avklart hvilket landstrygdeloving bruker skal omfattes av.'
  },
  {
    kode: 'AVSLUTTET',
    term: 'Saken er avsluttet'
  },
  {
    kode: 'HENLAGT',
    term: 'Saken har blitt henlagt'
  }
];
module.exports.saksstatuser = saksstatuser;
