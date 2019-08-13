const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-henlegg'];

module.exports.henleggFagsak = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) return Mock.manglerParamSaksnummer(req, res);
  SchemaValidator.post204(moduleName, req, res);
};
