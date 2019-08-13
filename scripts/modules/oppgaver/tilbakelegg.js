const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');

/**
 * tilbakelegg
 * @param req
 * @param res
 */
module.exports.tilbakelegg = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-tilbakelegg'];
  SchemaValidator.post204(moduleName, req, res);
};
