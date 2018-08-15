const fs = require('fs');
const Utils = require('./utils');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const INNGANG_MOCK_DIR = `${MOCK_DATA_DIR}/inngang`;

module.exports.lesAlleInngang = () => {
  return Utils.lesAlleJson(INNGANG_MOCK_DIR);
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
    res.status(500).send(err);
  }
};
