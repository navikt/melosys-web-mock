const SchemaPostValidator  = require('../../utils/schema-post-validator');
const SchemaGetValidator  = require('../../utils/schema-get-validator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap["eessi-bucer"];

module.exports.hentBucerUnderArbeid = async (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  return SchemaGetValidator.get(moduleName, req, res);
};
/**
 * status
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.opprett = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const rinaUrl = { rinaUrl: 'https://rina-oppl-utv004.adeo.no/portal/#/caseManagement/226792' };
  SchemaPostValidator.post(moduleName, req, res, rinaUrl);
};
