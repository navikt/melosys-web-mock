const Mock = require('../../utils/mock-util');

const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

module.exports.revurder = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['fagsaker-revurder'];

  const { saksnummer } = req.params;
  if (!saksnummer) {
    return Mock.manglerParamSaksnummer(req, res);
  }

  SchemaValidator.post(moduleName, req, res, { behandlingID: 12 });
};
