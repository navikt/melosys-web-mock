const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["trygdeavgift-beregning"];


module.exports.hentBeregning = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'trygdeavgift-beregning-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

module.exports.sendBeregning = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'trygdeavgift-beregning-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.putFromFile(moduleName, req, res, mockpathObject, moduleName);
};
