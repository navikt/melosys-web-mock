const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['oppgaver-oversikt'];

module.exports.oversikt = async (req, res) => {
  return SchemaValidator.get(moduleName, req, res);
};
