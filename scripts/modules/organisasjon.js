const organisasjon = {
    "orgnr":"923609016",
    "navn":"STATOIL ASA",
    "forretningsadresse":{
      "gateadresse":{
        "gatenavn":"Forusbeen 50"
      },
      "postnr":"4035",
      "land":"NO"
    },
    "postadresse":{
      "gateadresse":{
        "gatenavn":"Postboks 8500"
      },
      "postnr":"4035",
      "land":"NO"
    }
};
exports.hentOrganisasjon = (req, res) => {
  const orgnr = req.params.orgnr;
  res.json(organisasjon);
};
