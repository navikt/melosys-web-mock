const SchemaGetValidator  = require('../../utils/schema-get-validator');
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

  const pathObject = {
    pathname: '/fnr-:fnr',
    params: {fnr},
  };
  return SchemaGetValidator.get(moduleName, req, res, pathObject);
};
