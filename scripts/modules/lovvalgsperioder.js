const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { SCHEMA_DIR, MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');
const happy = require('./happystatus');
const SchemaPostValidator  = require('./schema-post-validator');

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
    const mockfile = `${LOVVALGSPERIODER_MOCK_DATA_DIR}/lovvalgsperiode-bid-${behandlingID}.json`;

    if (await Utils.existsAsync(mockfile)) {
      const data = await lesLovvalgsperioder(behandlingID);
      const status = happy.happyStatus([200, 200, 404]);
      if (status === 404) {
        return res.status(404).send(ERR.notFound404(req.url));
      }
      return res.json(data);
    }
    else {
      return res.status(404).send(ERR.notFound404(req.url));
    }
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
module.exports.send = (req, res) => {
  const schemajson = `${SCHEMA_DIR}/lovvalgsperioder-schema.json`;
  const schema = Schema.lesSchemaSync(schemajson);

  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Lovvalgsperioder:send';
  logger.debug(label, JSON.stringify(jsBody));

  const valid = SchemaPostValidator.test(label, schema, jsBody);
  return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
};
