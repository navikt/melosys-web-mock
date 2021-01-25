const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');
const { moduleName } = Katalog.pathnameMap["avklartefakta-oppsummering"];

const SchemaValidator = require('../../utils/schemavalidator');

module.exports.sendMedfolgendeFamilie = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const moduleNameForValidering = "avklartefakta-medfolgendeFamilie";
  const schemaNavn = `${moduleNameForValidering}-post-schema.json`;
  const label = `${moduleNameForValidering}:send`;
  SchemaValidator.validate(moduleNameForValidering, req, res, schemaNavn, label);

  const mockpathObject = {
    pathname: 'avklartefakta-oppsummering-bid-:behandlingID',
    params: {behandlingID},
  };
  let customResponse = await SchemaValidator.getFile(moduleName, mockpathObject);
  customResponse = {...customResponse, medfolgendeFamilie: req.body};

  return res.json(customResponse);
};
