const Mock = require('../utils/mock-util');
const SchemaValidator  = require('../utils/schemavalidator');
const Katalog = require('../katalog');

/**
 * Hent lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID} = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObj = {
    pathname: '/lovvalgsperiode-bid-:behandlingID',
    params: {behandlingID}
  };
  const { moduleName } = Katalog.pathnameMap.lovvalgsperioder;
  return SchemaValidator.get(moduleName, req, res, pathObj);
};

/**
 * Send lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const { moduleName } = Katalog.pathnameMap.lovvalgsperioder;
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaValidator.post(moduleName, req, res);
};

module.exports.opprinnelig = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['lovvalgsperioder-opprinnelig'];
  const { behandlingID} = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const pathObject = {
    pathname: '/opprinneligPeriode-bid-:behandlingID',
    params: {behandlingID}
  };
  SchemaValidator.get(moduleName, req, res, pathObject);
};
