const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const memcache = require('./memcache');

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;
    const status = memcache.getLibraryItem(behandlingID);
    if (!status) {
      console.log('Ingen cache entry for behandlingID', behandlingID);
      return res.json('DONE');
    }
    const { count, targetCount } = status;
    if (count === targetCount) {
      console.log('Max polling reached! count === targetCount, removing cache entry:', behandlingID);
      memcache.removeLibraryItem(behandlingID);
      return res.json('DONE');
    }
    console.log('Incrementing cache hit count, for behandlingID', behandlingID);
    memcache.setLibraryItem(behandlingID, count + 1);
    res.json('PROGRESS');
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
