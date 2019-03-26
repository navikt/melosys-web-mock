const { MOCK_DATA_DIR } = require('../../mock.config');
const Mock = require('../utils/mock-util');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const MOCK_DATA_ORG_DIR = `${MOCK_DATA_DIR}/organisasjoner`;

module.exports.lesOrganisasjonsKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_ORG_DIR);
};
/**
 * Les organisasjon json fil eller returner tom svar
 * @param orgnr
 * @returns {{}}
 */
const lesOrganisasjon = orgnr => {
  const mockfile = `${MOCK_DATA_ORG_DIR}/orgnr-${orgnr}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * Hent organisasjon git /api/organisasjon/?orgnr=:orgnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const { orgnr } = req.query;
    if (!orgnr) {
      return Mock.manglerParamOrgnr(req, res);
    }
    else if (orgnr.length !== 9)  {
      return Mock.badRequstParam(req, res, 'Orgnr må ha 9 siffer');
    }
    const organisasjon = await lesOrganisasjon(orgnr);
    return res.json(organisasjon);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
