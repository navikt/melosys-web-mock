const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');
const happy = require('./happystatus');
const Utils = require('./utils');
const Schema = require('../test/schema-util');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const VURDERING__MOCK_DATA_DIR = `${MOCK_DATA_DIR}/vurdering`;

module.exports.lesVurderingsKatalog = () => {
  return Schema.lesKatalog(VURDERING__MOCK_DATA_DIR);
};
/**
 * Hent vurdering
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = (req, res) => {
  try {
    const behandlingID = req.params.behandlingID;
    const mockfile = `${MOCK_DATA_DIR}/vurdering/vurdering-bid-${behandlingID}.json`;
    if (fs.existsSync(mockfile)) {
      const data = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      const status = happy.happyStatus([200, 200, 404]);
      if (status === 200) {
        data.vurdering.feilmeldinger = [];
      }
      return res.json(data);
    }
    else {
      logger.warn('Not found'+req.url);
      return res.status(404).send(ERR.notFound404(req.url));
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};

/**
 * Send vurdering
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const behandlingID = req.params.behandlingID;
  const body = req.body;
  let responseBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  responseBody.behandlingID = behandlingID;
  return res.json(responseBody);
};
