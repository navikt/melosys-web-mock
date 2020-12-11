const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["trygdeavgift-grunnlag"];


module.exports.hentGrunnlag = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'trygdeavgift-grunnlag-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};

module.exports.sendGrunnlag = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  return SchemaValidator.put(moduleName, req, res);
};
