const Schema = require('../../utils/schema-util');
const Utils = require('../../utils/utils');

const Mock = require('../../utils/mock-util');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const BEHANDLINGER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlinger`;
const BEHANDLING_MOCK_DIR = `${BEHANDLINGER_MOCK_DIR}/behandling`;
/**
 * lesBehandlingKatalog
 */
module.exports.lesBehandlingKatalog = () => {
  return Schema.lesKatalogSync(BEHANDLING_MOCK_DIR);
};

module.exports.hentBehandling = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${BEHANDLING_MOCK_DIR}/behandling-bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
