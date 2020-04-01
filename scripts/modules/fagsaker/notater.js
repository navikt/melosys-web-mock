const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-notater'];

module.exports.hentNotater = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  const pathObject = {
    pathname: 'notater-snr-:saksnummer',
    params: { saksnummer },
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.opprettNotat = (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }

  const customResponse = {
    tekst: req.body.tekst,
    notatId: 999,
    redigerbar: true,
    registrertDato: "2019-04-23T10:02:52.031Z",
    endretDato: "2019-04-23T10:58:23.899Z",
    registrertAvNavn: "LILLA HEST",
    behandlingstypeKode: "SOEKNAD"
  };

  SchemaValidator.post(moduleName, req, res, customResponse);
};

module.exports.oppdaterNotat = (req, res) => {
  const { saksnummer, notatid } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }
  if (!notatid) {
    return Mock.manglerParamNotatID(req, res);
  }

  const customResponse = {
    tekst: req.body.tekst,
    notatId: parseInt(notatid),
    redigerbar: true,
    registrertDato: "2019-04-23T10:02:52.031Z",
    endretDato: "2019-04-30T10:58:23.899Z",
    registrertAvNavn: "LILLA HEST",
    behandlingstypeKode: "SOEKNAD"
  };

  SchemaValidator.put(moduleName, req, res, customResponse);
};
