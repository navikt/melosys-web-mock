/**
 * Kodeverk/begrunnelser
 * @module
 */
const begrunnelser = {
  vesentligVirksomhet: [
    {
      kode: "KUN_ADMIN_ANSATTE",
      term: "Foretaket har kun administrativt ansatte i Norge.",
    },
    {
      kode: "FORLITE_OMSETNING_NORGE",
      term: "Foretaket har ikke hatt mer enn 25 % av sin omsetning i Norge de siste 12 månedene.",
    },
    {
      kode: "FORMANGE_ADMIN_ANSATTE",
      term: "Foretakets andel administrativt ansatte er større enn den totale andel ansatte som utfører sitt arbeid i Norge.",
    },
    {
      kode: "REKRUTTERER_ANSATTE_UTL",
      term: "Foretaket rekrutterer ikke ansatte i Norge.",
    },
    {
      kode: "FORLITE_OPPDRAG_NORGE",
      term: "Foretaket utfører mindre enn 50 % av sine oppdrag i Norge.",
    },
    {
      kode: "FORLITE_KONTRAKTER_NORGE",
      term: "Foretaket inngår mindre enn 50 % av sine kontrakter med kunder i Norge.",
    },
    {
      kode: "KONTRAKTER_IKKE_NORSKLOV",
      term: "Det er ikke norsk lovgivning som er gjeldende for kontraktene foretaket inngår med sine kunder",
    }
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
