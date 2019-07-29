const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["behandlinger-status"];
/**
 * status
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendStatus = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
};
