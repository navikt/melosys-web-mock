const Mock = require('../../utils/mock-util');

const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Katalog = require('../../katalog');

/**
 * fattet
 * @param req
 * @param res
 */
module.exports.fatte = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['saksflyt-vedtak-fatte'];
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
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
  SchemaPostValidator.post(moduleName, req, res);
};
