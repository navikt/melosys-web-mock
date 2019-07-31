const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');

/**
 * Oppgaver sok
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sok = async (req, res) => {
  const { fnr } = req.query;
  if (!fnr) return Mock.manglerParamFnr(req, res);

  const { moduleName } = Katalog.pathnameMap['oppgaver-sok'];
  const mockfile = `${MOCK_DATA_DIR}/${moduleName}/fnr-${fnr}.json`;
  try {
    const oppgaver = await Utils.readJsonAndParseAsync(mockfile);
    res.json(oppgaver);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
