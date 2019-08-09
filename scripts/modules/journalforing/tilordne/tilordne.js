const SchemaValidator  = require('../../../utils/schemavalidator');
const Katalog = require('../../../katalog');

/**
 * sendTilordneSak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendTilordneSak = (req, res) => {
  const { moduleName } = Katalog.pathnameMap["journalforing-tilordne"];
  SchemaValidator.post204(moduleName, req, res);
};

