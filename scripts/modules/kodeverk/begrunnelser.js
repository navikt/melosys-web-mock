/**
 * Kodeverk/begrunnelser
 * @module
 */
const begrunnelser = {
  vesentligVirksomhet: [
  {
    kode: "MINDRE_ENN_25_PROSENT",
    term: "Foretaket har hatt mindre enn 25% av samlet omsetning i Norge.",
  },
  {
    kode: "ADMINISTRATIVT_ANDEL_OVER_50_PROSENT",
    term: "Andelen administrativt ansatte i Norge er mer enn 50%.",
  },
  {
    kode: "ANSATTE_IKKE_REKRUTTERT_I_NORGE",
    term: "Ansatte blir ikke rekruttert i Norge.",
  },
  {
    kode: "MER_ENN_50_PROSENT_I_NORGE",
    term: "Utfører mindre enn 50% av oppdrag i Norge.",
  },
  {
    kode: "MER_ENN_50_PROSENT_OPPDRAGSKONTRAKT",
    term: "Mindre enn 50 prosent oppdragskontrakter inngått i Norge.",
  },
  {
    kode: "NORSK_LOVGIVNING_ER_GJELDENDE",
    term: "Norsk lovgivning er ikke gjeldende for kontraktene.",
  },
],
  ikkeSkipBegrunnelser: [
    {
      kode: "IKKE_EGET_FREMDRIFT",
      term: "Ikke eget fremdrift",
    },
    {
      kode: "IKKE_ORDINAERT_SKIPSFART",
      term: "Ikke ordinært skipsfart.",
    }
  ]}
;
module.exports.begrunnelser = begrunnelser;
