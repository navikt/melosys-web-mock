const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["representant-representant"];
const SchemaValidator = require('../../utils/schemavalidator');


module.exports.hentRepresentant = async (req, res) => {
  const { representantID } = req.params;
  if (!representantID) {
    return Mock.manglerParamRepresentantID(req, res);
  }
  const mockpathObject = {
    pathname: 'representant-rid-:representantID',
    params: { representantID },
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};
