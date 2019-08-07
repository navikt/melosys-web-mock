const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const SchemaValidator  = require('../../utils/schemavalidator');
const { moduleName } = Katalog.pathnameMap['dokumenter-oversikt'];

/**
 * oversikt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.oversikt = async (req, res) => {
  const { snr } = req.params;
  if (!snr) return Mock.manglerParamSaksnummer(req, res);
  const pathObj = {
    pathname: '/oversikt',
  };
  return SchemaValidator.get(moduleName, req, res, pathObj);
};
