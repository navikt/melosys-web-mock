/**
 * Kodeverk/saksstatuser
 * ref: https://confluence.adeo.no/display/TEESSI/Kodeverk+i+Melosys
 * Dato: 13SEP2018, Marte Okkelmo
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
    kode: 'FORELOEPIG_LOVVALG',
    term: 'Norge har foreløpig fastsatt hvilket landstrygdeloving bruker skal omfattes av. Dette i avventing av svar fra en eller flere utenlandske myndigheter om de sier seg enig eller fristen på besvarelse er utløpt .'
  },
  {
    kode: 'OPPHOERT',
    term: 'Saken er opphørt.'
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
