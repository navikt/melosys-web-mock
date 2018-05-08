const fs = require('fs');
const assert = require('assert');
const URL = require('url');
const _ = require('underscore');
const moment = require('moment');

const ERR = require('./errors');
const utils = require('./utils');
const happy = require('./happystatus');

const readableRandom = require('readable-random');
const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const timestamp = moment();


const lesFagsak = (fnr) => {
  const mockfile = `${MOCK_DATA_DIR}/sok/fagsaker/fnr-${fnr}.json`;
  if (fs.existsSync(mockfile)) {
    return JSON.parse(fs.readFileSync(mockfile, "utf8"));
  }
  return [];
};

const lesAlleFagsaker = () => {
  let fagsakListe = [];
  const mockSokFagsakerDir = `${MOCK_DATA_DIR}/sok/fagsaker/`;
  fs.readdirSync(mockSokFagsakerDir).forEach(file => {
    const fagsaker = JSON.parse(fs.readFileSync(`${mockSokFagsakerDir}/${file}`, 'UTF-8'));
    fagsaker.every((fagsak) => {
      fagsakListe.push(fagsak);
    })
  });
  fagsakListe = _.uniq(fagsakListe.sort((a, b) => {
    assert.ok(_.isString(a.saksnummer), 'Saksnummer must be a string');
    assert.ok(_.isString(b.saksnummer), 'Saksnummer must be a string');
    return a.saksnummer.localeCompare(b.saksnummer);
    //return a.saksnummer - b.saksnummer; // For ints
  }), true);
  return fagsakListe;
};

exports.sokFagsaker = (req, res) => {
  try {
    const fnr = req.query.fnr;
    if (fnr) {
      const nyesaker = lesFagsak(fnr);
      if (nyesaker && nyesaker.length) {
        return res.json(nyesaker);
      }
      else {
        const url = URL.parse(req.url);
        // Søk på fagsaker med fnr kan gi tomt svar, eller gi unauthorized
        const status = happy.happyStatus([200, 200, 403, 500]);
        switch (status) {
          case 200: {
            const tom_soknad = [];
            return res.json(tom_soknad);
          }
          case 403: {
            const melding = ERR.forbiddenRequest403(url.pathname);
            return res.status(status).send(melding);
          }
          case 500: {
            const melding = ERR.serverError500(url.pathname);
            return res.status(status).send(melding);
          }
        }
      }
    }
    else {
      let fagsakListe = lesAlleFagsaker();
      return res.json(fagsakListe);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

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

exports.sendNyFagsak = (req, res) => {
  const body = req.body;
  let jsonBody = utils.isJSON(body) ? JSON.parse(body) : body;
  console.log(jsonBody);
  res.json(jsonBody);
};
