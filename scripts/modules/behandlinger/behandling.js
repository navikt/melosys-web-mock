const Utils = require('../../utils/utils');
const SchemaPostValidator  = require('../../utils/schema-post-validator');

const Mock = require('../../utils/mock-util');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const BEHANDLING_MOCK_DIR = `${MOCK_DATA_DIR}/behandling`;

module.exports.hentBehandling = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${BEHANDLING_MOCK_DIR}/bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
