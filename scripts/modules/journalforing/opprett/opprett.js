const SchemaValidator  = require('../../../utils/schemavalidator');
const Katalog = require('../../../katalog');

/**
 * sendOpprettNySak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendOpprett = (req, res) => {
  const { moduleName } = Katalog.pathnameMap["journalforing-opprett"];
  SchemaValidator.post204(moduleName, req, res);
};
