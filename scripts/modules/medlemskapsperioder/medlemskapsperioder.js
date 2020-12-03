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
  const customResponse = {
    id: 6,
    arbeidsland: "US",
    fomDato: req.body.fomDato,
    tomDato: req.body.tomDato,
    bestemmelse: "FTRL_KAP2_2_8_FØRSTE_LEDD_A",
    innvilgelsesResultat: req.body.innvilgelsesResultat,
    trygdedekning: req.body.trygdedekning,
    medlemskapstype: "FRIVILLIG",
  };

  return SchemaValidator.post(moduleName, req, res, customResponse);
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
