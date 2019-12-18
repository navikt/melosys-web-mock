const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-opprett'];

module.exports.opprett = (req, res) => {
  SchemaValidator.post204(moduleName, req, res);
};
