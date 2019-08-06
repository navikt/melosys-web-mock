const Utils = require('../../utils/utils');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const { moduleName } = Katalog.pathnameMap["behandlinger"];

module.exports.hentBehandling = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  try {
    const mockfile = `${GET_DIR}/behandling-bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
