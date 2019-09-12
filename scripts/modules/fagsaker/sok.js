const SchemaValidator  = require('../../utils/schemavalidator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { moduleName } = Katalog.pathnameMap['fagsaker-sok'];

module.exports.sokFagsak = async (req, res) => {
  const { fnr: fnrdnr } = req.query;
  if (!fnrdnr) return Mock.manglerParamFnr(req, res);

  const pathObject = {
    pathname: 'sok-fnr-:fnrdnr',
    params: { fnrdnr },
  };
  return SchemaValidator.get(moduleName, req, res, pathObject);
};
