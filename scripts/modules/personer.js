const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');
const SchemaValidator = require('../utils/schemavalidator');

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hent = async (req, res) => {
  const { fnr } = req.params;
  if (!fnr) {
    return Mock.manglerParamFnr(req, res);
  }
  else if (fnr.length !== 11) {
    return Mock.badRequestParam(req, res, 'Fnr må ha 11 siffer')
  }
  const { moduleName } = Katalog.pathnameMap.personer;
  const mockpathObject = {
    pathname: 'fnr-:fnrdnr',
    params: {fnrdnr: fnr}
  };
  SchemaValidator.get(moduleName, req, res, mockpathObject);
};
