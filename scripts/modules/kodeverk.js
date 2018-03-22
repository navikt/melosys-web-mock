const landkoder = [
  {
    "kode": "BE",
    "term": "Belgia"
  },
  {
    "kode": "BG",
    "term": "Bulgaria"
  },
  {
    "kode": "DK",
    "term": "Danmark"
  },
  {
    "kode": "EE",
    "term": "Estland"
  },
  {
    "kode": "FI",
    "term": "Finland"
  },
  {
    "kode": "FR",
    "term": "Frankrike"
  },
  {
    "kode": "GR",
    "term": "Hellas"
  },
  {
    "kode": "IE",
    "term": "Irland"
  },
  {
    "kode": "IS",
    "term": "Island"
  },
  {
    "kode": "IT",
    "term": "Italia"
  },
  {
    "kode": "HR",
    "term": "Kroatia"
  },
  {
    "kode": "CY",
    "term": "Kypros"
  },
  {
    "kode": "LV",
    "term": "Latvia"
  },
  {
    "kode": "LI",
    "term": "Liechtenstein"
  },
  {
    "kode": "LT",
    "term": "Litauen"
  },
  {
    "kode": "LU",
    "term": "Luxembourg"
  },
  {
    "kode": "MT",
    "term": "Malta"
  },
  {
    "kode": "NL",
    "term": "Nederland"
  },
  {
    "kode": "NO",
    "term": "Norge"
  },
  {
    "kode": "PL",
    "term": "Polen"
  },
  {
    "kode": "PT",
    "term": "Portugal"
  },
  {
    "kode": "RO",
    "term": "Romania"
  },
  {
    "kode": "SK",
    "term": "Slovakia"
  },
  {
    "kode": "SI",
    "term": "Slovenia"
  },
  {
    "kode": "ES",
    "term": "Spania"
  },
  {
    "kode": "GB",
    "term": "Storbritannia"
  },
  {
    "kode": "SE",
    "term": "Sverige"
  },
  {
    "kode": "DE",
    "term": "Tyskland"
  },
  {
    "kode": "HU",
    "term": "Ungarn"
  },
  {
    "kode": "AT",
    "term": "Østerrike"
  }
];
const sakstyper = [
  {
    kode: "BOSTED_MED",
    term: "EU/EØS"
  }, {
    kode: "MIDL_LOVVALG_MED",
    term: "Trygdeavtale"
  }, {
    kode: "MIDL_FRANCOIS",
    term: "Folketrygd"
  }
];
const behandlingstyper = [
  {
    kode: "JFR_MED",
    term: "Søknad"
  },
  {
    kode: "UNNTAK_MED",
    term: "Unntak medlemsskap"
  }, {
    kode: "BEH_KLAGE",
    term: "Klage"
  }, {
    kode: "BEH_REVURDERING",
    term: "Revurdering"
  }, {
    kode: "BEH_MELDING",
    term: "Melding fra utenlandsk myndighet"
  }, {
    kode: "BEH_PASTAND",
    term: "Påstand fra utenlandsk myndighet"
  }
];
exports.hentAlleKodeverk = (req, res) => {
  const kodeverk = {
    landkoder,
    sakstyper,
    behandlingstyper
  };
  res.json(kodeverk);
};