const SchemaValidator = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['oppgaver-sok'];
/**
 * Oppgaver sok
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sok = async (req, res) => {
  const { fnr } = req.query;
  if (!fnr) return Mock.manglerParamFnr(req, res);

  const mockpathObject = {
    pathname: 'fnr-:fnrdnr',
    params: {fnrdnr: fnr},
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObject);
};
