const SchemaValidator = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const Mock = require('../../utils/mock-util');

module.exports.sok = async (req, res) => {
  const { moduleName } = Katalog.pathnameMap['oppgaver-sok'];
  const { fnr: fnrdnr } = req.query;

  if (!fnrdnr) return Mock.manglerParamFnr(req, res);

  const pathObject = {
    pathname: 'sok-fnr-:fnrdnr',
    params: { fnrdnr },
  };
  SchemaValidator.get(moduleName, req, res, pathObject);
};
