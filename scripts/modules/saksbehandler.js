const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const _ = require('underscore');

const Utils = require('./utils');
const Schema = require('../test/schema-util');
const ERR = require('./errors');
const happy = require('./happystatus');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_SAKSBEHANDLER_DIR = `${MOCK_DATA_DIR}/saksbehandler`;

module.exports.lesSaksbehandlerKatalog = () => {
  return Schema.lesKatalog(MOCK_DATA_SAKSBEHANDLER_DIR);
};
const lesSaksbehandlere = async () => {
  const mockfile = `${MOCK_DATA_DIR}/saksbehandler.json`;
  return await Utils.existsAsync(mockfile) ? JSON.parse(await Utils.readFileAsync(mockfile)) : {};
};

module.exports.hent = async (req, res) => {
  try {
    const saksbehandlere = await lesSaksbehandlere();
    const status = happy.happyStatus([200, 200, 200, 401, 500]);
    const url = '/saksbehandler';
    switch (status) {
      case 200:
        return res.json(_.sample(saksbehandlere));
      case 401: {
        const melding = ERR.unauthorizedRequest401(url);
        logger.warn(melding);
        return res.status(status).send(melding);
      }
      case 500: {
        const melding = ERR.serverError500(url);
        logger.error(melding);
        return res.status(status).send(melding);
      }
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};

