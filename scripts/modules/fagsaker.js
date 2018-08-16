const fs = require('fs');
const _ = require('underscore');
const moment = require('moment');
const readableRandom = require('readable-random');

const ERR = require('./errors');
const Utils = require('./utils');


const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

const timestamp = moment();

module.exports.lesFagsakerKatalog = () => {
  return Utils.lesKatalog(MOCK_DATA_FAGSAK_DIR);
};

module.exports.hent = (req, res) => {
  try {
    let { snr } = req.params;
    snr = snr && snr.toString() || '';
    const mockfile = `${MOCK_DATA_DIR}/fagsaker/snr-${snr}.json`;
    if (fs.existsSync(mockfile)) {
      const fagsaker = JSON.parse(fs.readFileSync(mockfile, "utf8"));
      return res.json(fagsaker);
    }
    else {
      console.error("File not found:"+ mockfile);
      const melding = ERR.notFound404(req.url);
      return res.status(404).send(melding);
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
/**
 * Opprett ny fagsak. /api/fagsaker/ny/:fnr
 * @param req
 * @param res
 * @returns {*|void}
 */
module.exports.opprett = (req, res) => {
  try {

    const fnr = req.params.fnr && req.params.fnr.toString() || '';

    fs.readdirSync(MOCK_DATA_FAGSAK_DIR).forEach(file => {
      const fagsak = JSON.parse(fs.readFileSync(`${MOCK_DATA_FAGSAK_DIR}/${file}`, 'UTF-8'));
      const { behandlinger } = fagsak;
      const { saksopplysninger } = behandlinger[0];
      if (saksopplysninger.person.fnr === fnr) {
        return res.json(fagsak);
      }
    });
    /*
    if (!funnet) {
      console.error(`Ingen fagsak funnet for fnr=${fnr}`);
      const error404Message = errorMessage(404,'Not Found', req.url);
      return res.status(404).send(JSON.stringify(error404Message));
    }
    */
    const fornavn = readableRandom.getString(5).toUpperCase();
    const etternavn = readableRandom.getString(8).toUpperCase();
    const mockfagsak = {
      saksnummer: _.random(5,20).toString(),
      fnr,
      sammensattNavn: `${fornavn} ${etternavn}`,
      type: 'A1',
      status: 'OPPRETTET',
      registrertDato: timestamp,
      kjoenn: _.sample(['M','K']),
    };
    const mockfile = `${MOCK_DATA_DIR}/sok/fagsaker/fnr-${fnr}.json`;
    const mockfagsaker = [...mockfagsak];
    fs.writeFileSync(mockfile, JSON.stringify(mockfagsaker, null, 2));
    return res.status(201).send(mockfagsak);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

