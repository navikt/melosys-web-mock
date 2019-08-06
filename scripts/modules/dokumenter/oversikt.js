const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap['dokumenter-oversikt'];

/**
 * oversikt
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.oversikt = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { snr } = req.params;
  if (!snr) return Mock.manglerParamSaksnummer(req, res);

  try {
    const mockfile = `${GET_DIR}/oversikt.json`;
    const oversikt = await Utils.readJsonAndParseAsync(mockfile);
    res.json(oversikt);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
