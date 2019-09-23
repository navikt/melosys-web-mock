const SchemaValidator  = require('../../../utils/schemavalidator');
const Mock = require('../../../utils/mock-util');
const Katalog = require('../../../katalog');

module.exports.henleggFagsak = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);
  const { moduleName } = Katalog.pathnameMap['fagsaker-henlegg'];
  SchemaValidator.post204(moduleName, req, res);
};

module.exports.henleggVideresend = (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);
  const { moduleName } = Katalog.pathnameMap['fagsaker-henlegg-videresend'];
  SchemaValidator.put204(moduleName,req, res);
};

module.exports.avsluttsaksombortfalt = async (req, res) => {
  const { saksnummer } = req.params;

  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);

  const { moduleName } = Katalog.pathnameMap['fagsaker-henlegg-avsluttsaksombortfalt'];
  SchemaValidator.put204(moduleName, req, res);
};
