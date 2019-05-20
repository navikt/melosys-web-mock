const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');

const Mock = require('../../utils/mock-util');
const BEHANDLINGSRESULTAT_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/behandlingsresultat`;

const lesBehandlingsresultat = bid => {
  const mockfile = `${BEHANDLINGSRESULTAT_MOCK_DATA_DIR}/bid-${bid}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * lesBehandlingsresultatKatalog
 */
module.exports.lesBehandlingsresultatKatalog = () => {
  return Schema.lesKatalogSync(BEHANDLINGSRESULTAT_MOCK_DATA_DIR);
};

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hentBehandlingsResultat = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const resultat = await lesBehandlingsresultat(behandlingID);
    return res.json(resultat);
  }
  catch (err) {
    Mock.badRequstParam(req, res, err);
  }
};
