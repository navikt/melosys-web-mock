const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const ERR = require('../utils/errors');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const LOVVALGSPERIODER_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/lovvalgsperioder`;

module.exports.lesLovvalgsperiodersKatalog = () => {
  return Schema.lesKatalogSync(LOVVALGSPERIODER_MOCK_DATA_DIR);
};

const lesLovvalgsperioder = async (behandlingID) => {
  const mockfile = `${LOVVALGSPERIODER_MOCK_DATA_DIR}/lovvalgsperiode-bid-${behandlingID}.json`;
  return JSON.parse(await Utils.readFileAsync(mockfile));
};

/**
 * Hent lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;

    const data = await lesLovvalgsperioder(behandlingID);
    return res.json(data);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

/**
 * Send lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = async (req, res) => {
  const schema = Schema.lesSchemaFileSync('lovvalgsperioder-schema.json');

  const label = 'Lovvalgsperioder:send';
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug(label, JSON.stringify(jsBody));

  const valid = await SchemaPostValidator.testAsync(label, schema, jsBody);
  return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
};
