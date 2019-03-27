const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Schema = require('../utils/schema-util');
const Mock = require('../utils/mock-util');
const PERSON_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/personer`;

const lesPerson = fnr => {
  const mockfile = `${PERSON_MOCK_DATA_DIR}/fnr-${fnr}.json`;
  return Utils.readJsonAndParseAsync(mockfile)
};

/**
 * lesPersonKatalog
 */
module.exports.lesPersonKatalog = () => {
  return Schema.lesKatalogSync(PERSON_MOCK_DATA_DIR);
};

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hent = async (req, res) => {
  try {
    const { fnr } = req.query;
    if (!fnr) {
      return Mock.manglerParamFnr(req, res);
    }
    else if (fnr.length !== 11) {
      return Mock.badRequstParam(req, res, 'Fnr må ha 11 siffer')
    }
    const person = await lesPerson(fnr);
    return res.json(person);
  }
  catch (err) {
    Mock.serverError(err, res, err);
  }
};
