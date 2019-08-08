const Katalog = require('../katalog');
const Mock = require('../utils/mock-util');
const SchemaValidator = require('../utils/schemavalidator');
const { moduleName } = Katalog.pathnameMap.inngang;
/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.hent = async (req, res) => {
  const { snr } = req.params;
  if (!snr) {
    Mock.manglerParamSaksnummer(req, res);
  }
  const mockpathObj = {
    pathname: 'inngang-snr-:saksnummer',
    params: {saksnummer: snr},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObj);
};
