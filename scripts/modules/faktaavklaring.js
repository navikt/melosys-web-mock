const fs = require('fs');
const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const Utils = require('./utils');
const Schema = require('../test/schema-util');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const FAKTAAVKLARING_MOCK_DIR = `${MOCK_DATA_DIR}/faktaavklaring`;

module.exports.lesFaktaavklaringKatalog = () => {
  return Schema.lesKatalog(FAKTAAVKLARING_MOCK_DIR);
};

const lesAvklaring = (behandlingID) => {
  const mockfile = `${FAKTAAVKLARING_MOCK_DIR}/faktaavklaring-bid-${behandlingID}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};
/**
 * Hent faktavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const avklaring = lesAvklaring(behandlingID);
    if (_.isEmpty(avklaring)) {
      return res.status(404).send(ERR.notFound404(req.url));
    }
    return res.json(avklaring);
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};
/**
 * Send faktaavklaring
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  const faktaavklaring = {
    behandlingID,
    faktaavklaring: { ...jsonBody.faktaavklaring }
  };

  return res.json(faktaavklaring);
};
