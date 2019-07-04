const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const Mock = require('../utils/mock-util');

const MOCK_DATA_SAKSBEHANDLER_DIR = `${MOCK_DATA_DIR}/saksbehandler`;

/**
 * lesSaksbehandlerKatalog
 */
module.exports.lesSaksbehandlerKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_SAKSBEHANDLER_DIR);
};
/**
 *lesSaksbehandlere
 * @returns {Promise<{}>}
 */
const lesSaksbehandlere = () => {
  const mockfile = `${MOCK_DATA_DIR}/saksbehandler.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.hent = async (req, res) => {
  try {
    const saksbehandlere = await lesSaksbehandlere();
    res.json(_.sample(saksbehandlere));
  }
  catch (err) {
   Mock.serverError(req, res, err);
  }
};

