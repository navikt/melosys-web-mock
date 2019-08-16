const memcache = require('../../../utils/memcache');
const Mock = require('../../../utils/mock-util');

/**
 * oppfrisk
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.oppfrisk = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const status = memcache.getLibraryItem(behandlingID);
    if (!status) {
      memcache.createLibraryItem(behandlingID);
      console.log('Created cache entry for behandlingID:', behandlingID);
    }
    res.status(204).send();
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * status
 * @param req
 * @param res
 * @returns {*|Request|Promise<any>}
 */
module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const status = memcache.getLibraryItem(behandlingID);
    if (!status) {
      console.log('Ingen cache entry for behandlingID:', behandlingID);
      return res.json('DONE');
    }
    const { count, targetCount } = status;
    if (count === targetCount) {
      console.log('Max polling reached! count === targetCount, removing cache entry:', behandlingID);
      memcache.removeLibraryItem(behandlingID);
      return res.json('DONE');
    }
    console.log('Incrementing cache hit count, for behandlingID:', behandlingID);
    memcache.setLibraryItem(behandlingID, count + 1);
    res.json('PROGRESS');
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
