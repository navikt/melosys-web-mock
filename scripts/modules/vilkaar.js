const SchemaValidator  = require('../utils/schemavalidator');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.vilkaar;

/**
 * Hent vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObj = {
    pathname: '/vilkaar-bid-:behandlingID',
    params: {behandlingID}
  };
  const { moduleName } = Katalog.pathnameMap.vilkaar;
  SchemaValidator.get(moduleName, req, res, pathObj);
};

/**
 * Send vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
