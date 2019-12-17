const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap.fagsaker;

module.exports.hentFagsak = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  const pathObject = {
    pathname: 'snr-:saksnummer',
    params: {saksnummer},
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.henleggFagsak = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);
  SchemaValidator.post204(moduleName, req, res);
};

module.exports.avsluttsaksombortfalt = async (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  SchemaValidator.put204(moduleName, req, res);
};

module.exports.avslutt = async (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  SchemaValidator.put204(moduleName, req, res);
};

module.exports.henleggVideresend = (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);
  const { moduleName } = Katalog.pathnameMap['fagsaker-henleggvideresend'];
  SchemaValidator.post204(moduleName,req, res);
};
