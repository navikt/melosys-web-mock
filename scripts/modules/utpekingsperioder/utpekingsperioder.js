const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');

const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['utpekingsperioder'];

module.exports.hent = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);

  const pathObject = {
    pathname: 'utpekingsperioder-bid-:behandlingID',
    params: { behandlingID },
  };

  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.send = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaValidator.post(moduleName, req, res);
};
