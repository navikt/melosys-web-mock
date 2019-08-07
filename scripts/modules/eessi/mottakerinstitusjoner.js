const ERR = require('../../utils/errors');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["eessi-mottakerinstitusjoner"];

module.exports.hent = async (req, res) => {
  const { bucType } = req.params;
  if (!bucType) {
    return ERR.badRequest400(req, res, 'Mangler bucType');
  }
  return SchemaValidator.get(moduleName, req, res);
};
