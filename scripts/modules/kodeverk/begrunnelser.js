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
    bosted: [
    {
      kode: "OPPHOLD_MER_ENN_12_MND",
      term: "Oppholdet er mer enn 12 måneder."
    },
    {
      kode: "HAR_IKKE_FORUTGAENDE_BOSTED_I_NORGE",
      term: "Har ikke forutgående bosted i Norge."
    },
    {
      kode: "IKKE_INTENSJON_OM_RETUR",
      term: "Har ikke intensjon om retur til Norge."
    },
    {
      kode: "FAMILIE_BOR_IKKE_I_NORGE",
      term: "Familie bor ikke i Norge."
    },
    {
      kode: "STUDIER_FINANSIERES_IKKE_FRA_NORGE",
      term: "Studier finansieres ikke fra Norge."
    },
    {
      kode: "HAR_IKKE_STUDIESTED_I_UTLANDET",
      term: "Har ikke studiested i utlandet."
    }
    ],
    ikkeSkip: [
      {
        "kode": "IKKE_EGET_FREMDRIFT",
        "term": "Ikke eget fremdrift"
      },
      {
        "kode": "IKKE_ORDINAERT_SKIPSFART",
        "term": "Ikke ordinært skipsfart"
      }
    ],
    opphold: [
      {
        kode: "FEIL_LAND_JOURNALFOERING",
        term: "Feil land oppgitt i journalføringen."
      },
      {
        kode: "UGYLDIG_TERRITORIE",
        term: "Søker skal til et territorium som ikke er en del av forordningen."
      },
      {
        kode: "NYE_OPPLYSNINGER",
        term: "Nye opplysninger om arbeids/oppholdsland."
      }
    ],
  forutgaendeMedlemskap: [
    {
      kode: "IKKE_LØNNET_UTSEND_AG",
      term: "Mottok IKKE lønn fra utsendende arbeidsgiver opptjent i Norge forutgående måned.",
    },
    {
      kode: "IKKE_LOENNET_NORGE",
      term: "Mottok IKKE lønn fra annen arbeidsgiver opptjent i Norge forutgående måned.",
    },
    {
      kode: "UNNTATT_MEDLEMSKAP",
      term: "Har direkte forutgående medlemskap i MEDL.",
    },
    {
      kode: "MOTTAT_LOENN_UTL",
      term: "Mottok lønn opptjent i annet land forutgående måned.",
    },
    {
      kode: "IKKE_FOLKEREGISTRERT_NORGE",
      term: "Har ikke TPS-adresse i Norge.",
    },
    {
      kode: "IKKE_ANSATT_UTSEND_AG",
      term: "Er IKKE registrert i Aa-registeret hos utsendende arbeidsgiver.",
    }
  ]
};

module.exports.begrunnelser = begrunnelser;
