const fs = require('fs');
const _ = require('underscore');
const moment = require('moment');
const ERR = require('./errors');
const readableRandom = require('readable-random');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const timestamp = moment();

exports.hentFagsak = (req, res) => {
  try {
    const snr = req.params.snr && req.params.snr.toString() || '';
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

exports.opprettNyFagsak = (req, res) => {
  try {

    const fnr = req.params.fnr && req.params.fnr.toString() || '';
    const mockFagsakerDir = `${MOCK_DATA_DIR}/fagsaker`;

    fs.readdirSync(mockFagsakerDir).forEach(file => {
      const fagsak = JSON.parse(fs.readFileSync(`${mockFagsakerDir}/${file}`, 'UTF-8'));
      if (fagsak.behandlinger[0].saksopplysninger.person.fnr === fnr) {
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
    mockfagsaker = [mockfagsak];
    fs.writeFileSync(mockfile, JSON.stringify(mockfagsaker, null, 2));
    return res.status(201).send(mockfagsak);
  }
  catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};