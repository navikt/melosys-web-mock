const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["avklartefakta-virksomheter"];

const SchemaValidator = require('../../utils/schemavalidator');

module.exports.sendVirksomhet = (req, res) => {
  const customResponse = { virksomheter: req.body };

  SchemaValidator.post(moduleName, req, res, customResponse);
};
