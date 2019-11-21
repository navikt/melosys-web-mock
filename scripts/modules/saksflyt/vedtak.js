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
 * endre
 * @param req
 * @param res
 */
module.exports.endre = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['saksflyt-vedtak-endre'];
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};

/**
 * revurder
 * @param req
 * @param res
 */
module.exports.revurder = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  setTimeout(() => res.json({ behandlingID: 12 }), 1000);
};
