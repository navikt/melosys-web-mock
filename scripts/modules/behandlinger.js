const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');
const Utils = require('./utils');

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      const melding = ERR.badRequest400(req.originalUrl, "behandlingID mangler");
      return res.status(400).send(melding);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    console.log(jsBody);
    res.status(204).send();
  }
  catch (err) {
    console.log(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
