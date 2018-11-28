const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const memcache = require('./memcache');

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;

    if (!memcache.getLibraryItem(behandlingID)) {
      return res.json('DONE');
    }
    const { count, targetCount } = memcache.getLibraryItem(behandlingID);
    if (count === targetCount) {
      memcache.removeLibraryItem(behandlingID);
      return res.json('DONE');
    }
    memcache.setLibraryItem(behandlingID, count + 1);
    res.json('PROGRESS');
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    res.status(500).send(err);
  }
};
