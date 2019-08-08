const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["behandlinger-tidligeremedlemsperioder"];

module.exports.hentTidligereMedlemsPerioder = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const mockpathObject = {
    pathname: 'medlemsperioder-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject );
};

/**
 * perioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.settTidligereMedlemsPerioder = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
