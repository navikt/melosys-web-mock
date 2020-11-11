const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['kodeverk-melosys-internt-folketrygden'];

module.exports.hentFolketrygden = async (req, res) => {
  return SchemaValidator.get(moduleName, req, res);
};
