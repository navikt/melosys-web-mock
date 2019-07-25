const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');

const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');

const { moduleName } = Katalog.pathnameMap["behandlinger-resultat"];
/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hentBehandlingsResultat = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${GET_DIR}/behandlingsresultat-bid-${bid}.json`;
    const resultat = Utils.readJsonAndParseAsync(mockfile);
    return res.json(resultat);
  }
  catch (err) {
    Mock.badRequstParam(req, res, err);
  }
};
