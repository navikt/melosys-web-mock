const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');

const Mock = require('../../utils/mock-util');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const BEHANDLINGER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlinger`;
const MEDLEMSPERIODER_MOCK_DIR = `${BEHANDLINGER_MOCK_DIR}/tidligeremedlemsperioder`;
/**
 * lesBehandlingKatalog
 */
module.exports.lesTidligereMedlemsPerioderKatalog = () => {
  return Schema.lesKatalogSync(MEDLEMSPERIODER_MOCK_DIR);
};

module.exports.hentTidligereMedlemsPerioder = async (req, res) => {
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const mockfile = `${MEDLEMSPERIODER_MOCK_DIR}/medlemsperioder-bid-${behandlingID}.json`;
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
  try {
    const { behandlingID } = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const { body } = req;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;

    const label = 'Behandlinger:settTidligereMedlemsPerioder';
    const schemaNavn = 'behandlinger-medlemsperioder-post-schema.json';

    const valid = SchemaPostValidator.test(label, schemaNavn, jsBody);
    return valid ? res.json(jsBody) : SchemaPostValidator.valideringFeil(req, res);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
