const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["representant-liste"];
const SchemaValidator = require('../../utils/schemavalidator');


module.exports.hentRepresentantListe = async (req, res) => {
  const mockpathObject = {
    pathname: 'representant-liste',
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};
