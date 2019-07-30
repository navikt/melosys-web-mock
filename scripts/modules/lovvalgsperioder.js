const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Mock = require('../utils/mock-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.lovvalgsperioder;
const LOVVALGSPERIODER_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

const lesLovvalgsperioder = (behandlingID) => {
  const mockfile = `${LOVVALGSPERIODER_MOCK_DATA_DIR}/lovvalgsperiode-bid-${behandlingID}.json`;
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
    const data = await lesLovvalgsperioder(behandlingID);
    return res.json(data);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * Send lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  /*
  const schema = Schema.lesSchemaFileSync('lovvalgsperioder-schema.json');

  const label = 'Lovvalgsperioder:send';
  const body = req.body;
  const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  logger.debug(label, JSON.stringify(jsBody));
  try {
    const valid = await SchemaPostValidator.testAsync(label, schema, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
  */

  const { behandlingID } = req.params;

  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};
