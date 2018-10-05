const log4js = require('log4js');
const logger = log4js.getLogger('mock');

module.exports.oppfrisk = (req, res) => {
  try {
    return res.status(204).send();
  }

  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};
