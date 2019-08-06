const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["behandlinger-tidligeremedlemsperioder"];

module.exports.hentTidligereMedlemsPerioder = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: 'medlemsperioder-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaGetValidator.get(moduleName, req, res, pathObject );
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
  SchemaPostValidator.post(moduleName, req, res);
};
