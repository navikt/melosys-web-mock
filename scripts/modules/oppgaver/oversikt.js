const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['oppgaver-oversikt'];

module.exports.oversikt = async (req, res) => {
  return SchemaGetValidator.get(moduleName, req, res);
};
