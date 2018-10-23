const log4js = require('log4js');
const logger = log4js.getLogger('mock');

let statusLibrary = {};

const createLibraryItem = behandlingID => {
  statusLibrary[behandlingID] = { behandlingID, count: 0, targetCount: 1 + Math.floor(Math.random() * 2) };
};

const removeLibraryItem = behandlingID => {
  delete statusLibrary[behandlingID];
};

module.exports.oppfrisk = (req, res) => {
  try {
    const { behandlingID } = req.params;
    if(!statusLibrary[behandlingID]) { createLibraryItem(behandlingID) }

    res.status(204).send();
  }

  catch (err) {
    console.error(err);
    logger.error(err);
    res.status(500).send(err);
  }
};

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;

    if(!statusLibrary[behandlingID]) { return res.json('DONE'); }

    const { count, targetCount } = statusLibrary[behandlingID];

    if (count === targetCount) {
      removeLibraryItem(behandlingID);
      return res.json('DONE');
    }

    statusLibrary[behandlingID] = { ...statusLibrary[behandlingID], count: count + 1 };
    res.json('PROGRESS');
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    res.status(500).send(err);
  }
};
