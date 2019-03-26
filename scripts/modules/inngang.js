const { MOCK_DATA_DIR } = require('../../mock.config');
const Schema = require('../utils/schema-util');
const Utils = require('../utils/utils');

const Mock = require('../utils/mock-util');
const INNGANG_MOCK_DIR = `${MOCK_DATA_DIR}/inngang`;

/**
 * lesInngangKatalog
 */
module.exports.lesInngangKatalog = () => {
  return Schema.lesKatalogSync(INNGANG_MOCK_DIR);
};

const lesInngang = snr => {
  const mockfile = `${INNGANG_MOCK_DIR}/inngang-snr-${snr}.json`;
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
    const { snr } = req.params;
    if (!snr) {
      Mock.manglerParamSaksnummer(req, res);
    }
    const inngang = await lesInngang(snr);
    res.json(inngang);
  }
  catch (err) {
   Mock.serverError(req, res, err);
  }
};
