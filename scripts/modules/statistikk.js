const SchemaValidator  = require('../utils/schemavalidator');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap['statistikk'];

module.exports.hent = (req, res) => {
  return SchemaValidator.get(moduleName, req, res);
};
