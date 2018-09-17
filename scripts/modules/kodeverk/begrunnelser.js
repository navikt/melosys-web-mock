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
  ikkeSkip: [
    {
      kode: "IKKE_EGET_FREMDRIFT",
      term: "Ikke eget fremdrift",
    },
    {
      kode: "IKKE_ORDINAERT_SKIPSFART",
      term: "Ikke ordinært skipsfart.",
    }
  ],
  forutgaendeMedlemskap: [
    {
      kode: "MOTTOK_IKKE_LOENN_FRA_UTSENDENDE",
      term: "Mottok IKKE lønn fra utsendende arbeidsgiver opptjent i Norge forutgående måned.",
    },
    {
      kode: "MOTTOK_IKKE_LOENN_ANNEN",
      term: "Mottok IKKE lønn fra annen arbeidsgiver opptjent i Norge forutgående måned.",
    },
    {
      kode: "DIREKTE_FORUTGAENDE_MEDLEMSKAP",
      term: "Har direkte forutgående medlemskap i MEDL.",
    },
    {
      kode: "MOTTOK_LONN_OPPTJENT",
      term: "Mottok lønn opptjent i annet land forutgående måned.",
    },
    {
      kode: "ER_IKKE_REGISTRERT_I_AAREG",
      term: "Er IKKE registrert i Aa-registeret hos utsendende arbeidsgiver.",
    },
    {
      kode: "HAR_IKKE_TPS_ADRESSE",
      term: "Har ikke TPS-adresse i Norge.",
    }
  ],
  }
;
module.exports.begrunnelser = begrunnelser;
