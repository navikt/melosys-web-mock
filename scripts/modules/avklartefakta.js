const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Mock = require('../utils/mock-util');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');

const SchemaPostValidator  = require('../utils/schema-post-validator');
const AVKLARTEFAKTA_MOCK_DIR = `${MOCK_DATA_DIR}/avklartefakta`;

/**
 * lesAvklartefaktaKatalog
 */
module.exports.lesAvklartefaktaKatalog = () => {
  return Schema.lesKatalogSync(AVKLARTEFAKTA_MOCK_DIR);
};

/**
 * lesAvklartefaktaPostMock
 * @returns {{document, navn}}
 */
module.exports.lesAvklartefaktaPostMock = () => {
  const mockfile = `${AVKLARTEFAKTA_MOCK_DIR}/post/avklartefakta-post.json`;
  return Schema.lesKatalogElement(mockfile);
};

const lesAvklaring = behandlingID => {
  const mockfile = `${AVKLARTEFAKTA_MOCK_DIR}/avklartefakta-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = await lesAvklaring(behandlingID);
    return res.json(avklaring);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};


/**
 * Send Avklartefakta
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const label = 'Avklartefakta:send';
  logger.debug(`${label}`, JSON.stringify(jsBody));

  try {
    const schema = Schema.lesSchemaFileSync('avklartefakta-post-schema.json');
    const defs = ['definitions-avklartefakta-schema.json'];
    const valid = SchemaPostValidator.test2(label, defs, schema, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
