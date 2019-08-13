const Mock = require('../../utils/mock-util');

const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

/**
 * fattet
 * @param req
 * @param res
 */
module.exports.fatt = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['saksflyt-vedtak-fatt'];
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};

/**
 * endreperiode
 * @param req
 * @param res
 */
module.exports.endreperiode = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['saksflyt-vedtak-endreperiode'];
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
