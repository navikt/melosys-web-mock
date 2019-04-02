const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Mock = require('../../utils/mock-util');

const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

module.exports.lesFagsakerKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_FAGSAK_DIR);
};

module.exports.hentFagsak = async (req, res) => {
  try {
    let { saksnummer } = req.params;
    const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${saksnummer}.json`;
    const fagsaker = JSON.parse(await Utils.readFileAsync(mockfile));
    res.json(fagsaker);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.henleggFagsak = async (req, res) => {
  const schemaNavn = 'henlegg-fagsak-schema.json';
  const label = 'Fagsaker::fagsak:henlegg';
  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test2(label, schemaNavn, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
