const fs = require('fs');
const assert = require('assert');
const URL = require('url');
const _ = require('underscore');

const ERR = require('./errors');
const Utils = require('./utils');
const happy = require('./happystatus');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;
const MOCK_SOK_FAGFSAKER_DIR = `${MOCK_DATA_DIR}/sok/fagsaker`;

module.exports.lesAlleSokFagsaker = () => {
  return Utils.lesAlleJson(MOCK_SOK_FAGFSAKER_DIR);
};
const lesSokFagsak = (fnr) => {
  const mockfile = `${MOCK_SOK_FAGFSAKER_DIR}/fnr-${fnr}.json`;
  if (fs.existsSync(mockfile)) {
    return JSON.parse(fs.readFileSync(mockfile, "utf8"));
  }
  return [];
};

const lesSokFagsakListe = () => {
  let fagsakListe = [];
  fs.readdirSync(MOCK_SOK_FAGFSAKER_DIR).forEach(file => {
    const fagsaker = JSON.parse(fs.readFileSync(`${MOCK_SOK_FAGFSAKER_DIR}/${file}`, 'UTF-8'));
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

/**
 * Sok fagsak; [GET] /api/fagsaker/sok/?:fnr
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sok = (req, res) => {
  try {
    const fnr = req.query.fnr;
    if (fnr) {
      const nyesaker = lesSokFagsak(fnr);
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
      let fagsakListe = lesSokFagsakListe();
      return res.json(fagsakListe);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
