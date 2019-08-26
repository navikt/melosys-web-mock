const SchemaValidator  = require('../../../utils/schemavalidator');
const Mock = require('../../../utils/mock-util');
const Katalog = require('../../../katalog');
const { moduleName } = Katalog.pathnameMap['registrering-unntaksperioder'];
/**
 * unntaksperioder
 * @param req
 * @param res
 */
module.exports.sendUnntaksperiode = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaValidator.post(moduleName, req, res);
};
