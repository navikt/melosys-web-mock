const fs = require('fs');
const _ = require('underscore');
const moment = require('moment');
const readableRandom = require('readable-random');
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
 * Opprett ny fagsak. /api/fagsaker/ny/:fnr
 * @param req
 * @param res
 * @returns {*|void}
 */

let mockFagsakJSON = require('../mock_data/fagsaker/snr-3');
module.exports.opprett = (req, res) => {
  // const fnr = req.params.fnr && req.params.fnr.toString() || '';
  // Use fnr to lookup fagsak and assign new saksnummer

  const fornavn = readableRandom.getString(5).toUpperCase();
  const etternavn = readableRandom.getString(8).toUpperCase();
  // const sammensattNavn = `${fornavn} ${etternavn}`;
  const { saksnummer, registrertDato, gsakSaksnummer, endretDato, ...rest } = mockFagsakJSON;
  const mockfagsak = {
    saksnummer: _.random(10,30),
    registrertDato: moment.utc().format(),
    endretDato: null,
    gsakSaksnummer: _.random(10000, 99999),
    ...rest,
  };
  res.status(201).send(mockfagsak);
};

