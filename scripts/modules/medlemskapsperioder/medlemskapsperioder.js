const Mock = require('../../utils/mock-util');
const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

const { moduleName } = Katalog.pathnameMap['medlemskapsperioder'];

module.exports.getMedlemskapsperioder = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: 'medlemskapsperioder-bid-:behandlingID',
    params: {behandlingID},
  };

  return SchemaValidator.get(moduleName, req, res, pathObject);
};

module.exports.postMedlemskapsperiode = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  return SchemaValidator.post(moduleName, req, res);
};

module.exports.putMedlemskapsperiode = async (req, res) => {
  const { behandlingID, medlemskapsperiodeID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (!medlemskapsperiodeID) {
    return Mock.manglerParamMedlemskapsperiodeID(req, res);
  }

  return SchemaValidator.put(moduleName, req, res);
};

module.exports.deleteMedlemskapsperiode = async (req, res) => {
  const { behandlingID, medlemskapsperiodeID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  if (!medlemskapsperiodeID) {
    return Mock.manglerParamMedlemskapsperiodeID(req, res);
  }


  return SchemaValidator.slett(moduleName, req, res);
};
