const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');
const SchemaValidator = require('../utils/schemavalidator');

/**
 * Hent organisasjon git /api/organisasjon/?orgnr=:orgnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { orgnr } = req.query;
  if (!orgnr) {
    return Mock.manglerParamOrgnr(req, res);
  }
  else if (orgnr.length !== 9)  {
    return Mock.badRequstParam(req, res, 'Orgnr må ha 9 siffer');
  }

  const { moduleName } = Katalog.pathnameMap.organisasjoner;
  const pathObj = {
    pathname: '/orgnr-:orgnr',
    params: {orgnr}
  };
  return SchemaValidator.get(moduleName, req, res, pathObj);
};
