const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../mock.config');
const ERR = require('../utils/errors');
const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Katalog = require('../katalog');

const { moduleName } = Katalog.pathnameMap.vilkaar;
const VILKAR_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

const lesVilkar = (behandlingID) => {
  const mockfile = `${VILKAR_MOCK_DATA_DIR}/${moduleName}-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * Hent vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  const behandlingID = req.params.behandlingID;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  try {
    const vilkar = await lesVilkar(behandlingID);
    res.json(vilkar);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

/**
 * Send vilkar
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const behandlingID = req.params.behandlingID;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
};
