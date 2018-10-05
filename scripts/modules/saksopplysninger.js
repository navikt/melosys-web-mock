const log4js = require('log4js');
const logger = log4js.getLogger('mock');

let statusLibrary = {};

const createLibraryItem = behandlingID => {
  statusLibrary[behandlingID] = { behandlingID, count: 0, targetCount: Math.round(Math.random() * 10) };
}

module.exports.oppfrisk = (req, res) => {
  try {
    const { behandlingID } = req.params;
    createLibraryItem(behandlingID);

    return res.status(204).send();
  }

  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;

    if(!statusLibrary[behandlingID]) { createLibraryItem(behandlingID) }
    const { count, targetCount } = statusLibrary[behandlingID];

    if (count === targetCount) {
      return res.json('DONE');
    }

    statusLibrary[behandlingID] = { ...statusLibrary[behandlingID], count: count + 1 };
    return res.json('PROGRESS');
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};
