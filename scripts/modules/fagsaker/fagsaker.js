const URL = require('url');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');
const SchemaPostValidator  = require('../schema-post-validator');
const ERR = require('../../utils/errors');

const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

module.exports.lesFagsakerKatalog = () => {
  return Schema.lesKatalogSync(MOCK_DATA_FAGSAK_DIR);
};

module.exports.hentFagsak = async (req, res) => {
  try {
    let { snr } = req.params;
    snr = snr && snr.toString() || '';
    const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${snr}.json`;
    logger.trace(mockfile);
    const exists = await Utils.existsAsync(mockfile);
    if (exists) {
      const fagsaker = JSON.parse(await Utils.readFileAsync(mockfile));
      res.json(fagsaker);
    }
    else {
      console.error("File not found:"+ mockfile);
      logger.error("File not found"+mockfile);
      const melding = ERR.notFound404(req.url);
      res.status(404).send(melding);
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.oppfriskFagsak = (req, res) => {
  try {
    res.status(204).send();
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};

module.exports.henleggFagsak = async (req, res) => {
  const schema = Schema.lesSchemaFileSync('henlegg-fagsak-schema.json');
  const label = 'Fagsaker::fagsak:henlegg';
  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = SchemaPostValidator.test(label, schema, jsBody);
    return valid ? res.status(204).send() : SchemaPostValidator.valideringFeil(req, res);
  }
  catch(err) {
    console.log(err);
    logger.error(err);
    const url = URL.parse(req.url);
    const melding = ERR.serverError500(url, err);
    res.status(500).send(melding);
  }
};
