const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const Schema = require('../test/schema-util');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const INNGANG_MOCK_DIR = `${MOCK_DATA_DIR}/inngang`;

module.exports.lesInngangKatalog = () => {
  return Schema.lesKatalog(INNGANG_MOCK_DIR);
};

const lesInngang = (snr) => {
  const mockfile = `${INNGANG_MOCK_DIR}/inngang-snr-${snr}.json`;
  return fs.existsSync(mockfile) ? JSON.parse(fs.readFileSync(mockfile, "utf8")) : {};
};

module.exports.hent = (req, res) => {
  try {
    const snr = req.params.snr;
    const inngang = lesInngang(snr);
    res.json(inngang);
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send(err);
  }
};
