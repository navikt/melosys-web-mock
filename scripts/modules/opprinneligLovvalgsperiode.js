const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const Mock = require('../utils/mock-util');

const LOVVALGSPERIODER_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/lovvalgsperioder`;
const OPPRINNELIG_LOVVALGSPERIODE_MOCK_DATA_DIR = `${LOVVALGSPERIODER_MOCK_DATA_DIR}/opprinneligPeriode`;

module.exports.lesOpprinneligLovvalgsPeriodeKatalog = () => {
  return Schema.lesKatalogSync(OPPRINNELIG_LOVVALGSPERIODE_MOCK_DATA_DIR);
};

const lesOpprinneligLovvalgsperiode = async (behandlingID) => {
  const mockfile = `${OPPRINNELIG_LOVVALGSPERIODE_MOCK_DATA_DIR}/opprinneligPeriode-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};
/**
 * Hent lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const { behandlingID} = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const data = await lesOpprinneligLovvalgsperiode(behandlingID);
    return res.json(data);
  }
  catch (err) {
    logger.error(err);
    Mock.serverError(req, res, err);
  }
};
