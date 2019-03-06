const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const ERR = require('../../utils/errors');
const Schema = require('../../utils/schema-util');
const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;


module.exports.lesSokOppgaveKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_OPPGAVE_SOK_DIR);
};

const lesOppgave = async (fnr) => {
  const mockfile = `${MOCK_DATA_OPPGAVE_SOK_DIR}/fnr-${fnr}.json`;
  return await Utils.existsAsync(mockfile) ? JSON.parse(await Utils.readFileAsync(mockfile)) : [];
};
/**
 * Sok oppgaver
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sok = async (req, res) => {
  try {
    const fnr = req.query.fnr;
    const oppgaver = await lesOppgave(fnr);
    return res.json(oppgaver);
  } catch (err) {
    logger.error(err);
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};