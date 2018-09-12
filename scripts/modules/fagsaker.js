const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const ERR = require('./errors');
const Schema = require('../test/schema-util');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

module.exports.lesFagsakerKatalog = () => {
  return Schema.lesKatalog(MOCK_DATA_FAGSAK_DIR);
};

module.exports.hent = (req, res) => {
  try {
    let { snr } = req.params;
    snr = snr && snr.toString() || '';
    const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${snr}.json`;
    logger.trace(mockfile);
    if (fs.existsSync(mockfile)) {
      const fagsaker = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      return res.json(fagsaker);
    }
    else {
      console.error("File not found:"+ mockfile);
      logger.error("File not found"+mockfile);
      const melding = ERR.notFound404(req.url);
      return res.status(404).send(melding);
    }
  }
  catch (err) {
    console.error(err);
    logger.error(err);
    return res.status(500).send(err);
  }
};
/**
 * @deprecated Benyttes kun i spark på t5
 * Opprett ny fagsak. [GET] /api/fagsaker/ny/:fnr
 * @param req
 * @param res
 * @returns {*|void}
 */

module.exports.opprett = (req, res) => {
  const melding = ERR.gone410(req.uri);
  res.status(410).send(melding);
};

