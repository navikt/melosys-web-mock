const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["representant-valgt"];
const SchemaValidator = require('../../utils/schemavalidator');


module.exports.hentValgtRepresentant = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'representant-valgt',
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};


module.exports.sendValgtRepresentant = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const customResponse = req.body;

  SchemaValidator.post(moduleName, req, res, customResponse);
};
