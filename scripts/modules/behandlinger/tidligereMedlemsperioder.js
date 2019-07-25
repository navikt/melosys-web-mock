const Utils = require('../../utils/utils');
const SchemaPostValidator  = require('../../utils/schema-post-validator');

const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap["behandlinger-tidligeremedlemsperioder"];

module.exports.hentTidligereMedlemsPerioder = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${GET_DIR}/medlemsperioder-bid-${behandlingID}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * perioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.settTidligereMedlemsPerioder = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  SchemaPostValidator.post(moduleName, req, res);
};
