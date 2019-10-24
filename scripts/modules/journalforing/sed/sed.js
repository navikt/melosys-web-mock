const SchemaValidator  = require('../../../utils/schemavalidator');
const Katalog = require('../../../katalog');

/**
 * sendTilordneSak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendSed = (req, res) => {
  const { moduleName } = Katalog.pathnameMap["journalforing-sed"];
  SchemaValidator.post204(moduleName, req, res);
};

