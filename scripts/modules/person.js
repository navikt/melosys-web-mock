const person = {
  fnr: '05056335023',
  sivilstand: 'Gift',
  statsborgerskap: 'NOR',
  sammensattNavn: 'LILLA HEST',
  bostedsadresse: {
    gateadresse: {
      gatenavn: 'ANDEBYVEIEN',
      gatenummer: 0,
      husnummer: 123,
      husbokstav: 'A',
    },
    postnr: '5081',
    land: 'NOR',
  },
  kjoenn: 'K',
  foedselsdato: '1963-05-05',
};
exports.hentPerson = (req, res) => {
  const fnrdnr = req.params.fnrdnr;
  res.json(person);
};
