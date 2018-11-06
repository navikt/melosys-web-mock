const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const ERR = require('./errors');
const URL = require('url');

module.exports.lagre = (req, res) => {
  const url = URL.parse(req.url);
  try {
    return res.status(204).send();
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};
