const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

const lesSoknad = (behandlingID) => {
  const mockfileSoknad = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return JSON.parse(Utils.readFileSync(mockfileSoknad));
};
/**
 * lesSoknadAsync
 * @param behandlingID
 * @returns {Promise<*>}
 */
const lesSoknadAsync = behandlingID => {
  const mockfile = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};
module.exports.lesSoknad = lesSoknad;

/**
 * lesSoknadKatalog
 */
module.exports.lesSoknadKatalog = () => {
  return Schema.lesKatalogSync(MOCK_SOKNAD_DIR);
};

/**
 * Hent soknad
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const { behandlingID } = req.params;
  try {
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const soknad = await lesSoknadAsync(behandlingID);
    return res.json(soknad);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
/**
 * Send soknad
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = async (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = "Soknad:Send";
  logger.debug(`${label}`, body);

  try {
    const schemaNavn = 'soknad-post-schema.json';
    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);

    return valid ? res.json(body) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

