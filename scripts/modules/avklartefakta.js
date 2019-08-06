const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.avklartefakta;

const SchemaPostValidator  = require('../utils/schema-post-validator');
const SchemaGetValidator  = require('../utils/schema-get-validator');

/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: '/avklartefakta-bid-:behandlingID',
    params: {behandlingID},
  };
  return SchemaGetValidator.get(moduleName, req, res, pathObject);
};


/**
 * Send Avklartefakta
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  SchemaPostValidator.post(moduleName, req, res);
};
