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
    kode: "EU_EOS",
    term: "EU/EØS"
  }, {
    kode: "AVTALE",
    term: "Trygdeavtale"
  }, {
    kode: "FOLKETRYGD",
    term: "Folketrygd"
  }
];
const behandlingstyper = [
  {
    kode: "ae0034",
    term: "Søknad"
  }, {
    kode: "todo0001",
    term: "Unntak medlemsskap"
  }, {
    kode: "ae0058",
    term: "Klage"
  }, {
    kode: "ae0028",
    term: "Revurdering"
  }, {
    kode: "todo0002",
    term: "Melding fra utenlandsk myndighet"
  }, {
    kode: "todo0003",
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