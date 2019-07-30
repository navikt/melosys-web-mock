const SchemaPostValidator  = require('../utils/schema-post-validator');
const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap['registrering-unntaksperioder'];
/**
 * unntaksperioder
 * @param req
 * @param res
 */
module.exports.unntaksperioder = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
};
