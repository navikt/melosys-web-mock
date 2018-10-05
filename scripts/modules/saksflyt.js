const log4js = require('log4js');
const logger = log4js.getLogger('mock');

let statusLibrary = {};

const createLibraryItem = behandlingID => {
  statusLibrary[behandlingID] = { behandlingID, count: 0, targetCount: Math.round(Math.random() * 10) };
}

const removeLibraryItem = behandlingID => {
  delete statusLibrary[behandlingID]
}

module.exports.status = (req, res) => {
  try {
    const { behandlingID } = req.params;

    if(!statusLibrary[behandlingID]) { createLibraryItem(behandlingID) }
    const { count, targetCount } = statusLibrary[behandlingID];

    if (count === targetCount) {
      removeLibraryItem(behandlingID)
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
