const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');
const Schema = require('../../utils/schema-util');
const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;


module.exports.lesSokOppgaveKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_OPPGAVE_SOK_DIR);
};

const lesOppgave = async (fnr) => {
  const mockfile = `${MOCK_DATA_OPPGAVE_SOK_DIR}/fnr-${fnr}.json`;
  return await Utils.existsAsync(mockfile) ? Utils.readJsonAndParseAsync(mockfile) : [];
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
    res.json(oppgaver);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
