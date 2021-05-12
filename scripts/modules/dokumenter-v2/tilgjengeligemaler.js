const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');
const { moduleName } = Katalog.pathnameMap["dokumenter-v2-tilgjengelige-maler"];

const SchemaValidator = require('../../utils/schemavalidator');


module.exports.hentTilgjengeligeMaler = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'tilgjengelige-maler',
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

