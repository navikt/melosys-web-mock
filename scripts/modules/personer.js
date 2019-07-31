const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');

const lesPerson = fnr => {
  const { moduleName } = Katalog.pathnameMap.personer;
  const mockfile = `${MOCK_DATA_DIR}/${moduleName}/fnr-${fnr}.json`;
  return Utils.readJsonAndParseAsync(mockfile)
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
