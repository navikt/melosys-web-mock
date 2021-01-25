const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');
const { moduleName } = Katalog.pathnameMap["avklartefakta-oppsummering"];

const SchemaValidator = require('../../utils/schemavalidator');

module.exports.sendVirksomhet = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }

  const mockpathObject = {
    pathname: 'avklartefakta-oppsummering-bid-:behandlingID',
    params: {behandlingID},
  };
  let customResponse = await SchemaValidator.getFile(moduleName, mockpathObject);
  customResponse = {...customResponse, virksomheter: req.body};

  return res.json(customResponse);
};
