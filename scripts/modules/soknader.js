const assert = require('assert');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Katalog = require('../katalog');
const { moduleName } = Katalog.pathnameMap.soknader;
const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

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
  assert.ok(behandlingID, 'behandlingID må ha verdi!!');
  const mockfile = `${MOCK_SOKNAD_DIR}/soknad-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};
module.exports.lesSoknad = lesSoknad;

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
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
};

