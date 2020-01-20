const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-utpek'];

module.exports.utpek = async (req, res) => {
  const { saksnummer } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }

  return SchemaValidator.post204(moduleName, req, res);
};
