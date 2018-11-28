const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const memcache = require('./memcache');

module.exports.oppfrisk = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!memcache.getLibraryItem(behandlingID)) {
      memcache.createLibraryItem(behandlingID);
    }
    res.status(204).send();
  }

  catch (err) {
    console.error(err);
    logger.error(err);
    res.status(500).send(err);
  }
};
