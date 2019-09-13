const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

module.exports.sendPlukk = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-plukk'];
  SchemaValidator.post(moduleName, req, res);
};
