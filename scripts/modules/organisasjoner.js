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
  const { orgnr } = req.params;
  if (!orgnr) {
    return Mock.manglerParamOrgnr(req, res);
  }
  else if (orgnr.length !== 9)  {
    return Mock.badRequestParam(req, res, 'Orgnr må ha 9 siffer');
  }

  const { moduleName } = Katalog.pathnameMap.organisasjoner;
  const mockpathObj = {
    pathname: 'orgnr-:orgnummer',
    params: {orgnummer: orgnr}
  };
  return SchemaValidator.get(moduleName, req, res, mockpathObj);
};
