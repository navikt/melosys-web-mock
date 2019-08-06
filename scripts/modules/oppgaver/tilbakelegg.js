const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Katalog = require('../../katalog');

/**
 * tilbakelegg
 * @param req
 * @param res
 */
module.exports.tilbakelegg = (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-tilbakelegg'];
  SchemaPostValidator.post204(moduleName, req, res);
};
