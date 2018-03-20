const fs = require('fs');
const _ = require('underscore');
const ERR = require('./errors');
const happy = require('./happystatus');

const MOCK_DATA_DIR = `${process.cwd()}/scripts/mock_data`;

exports.sokFagsaker_fnr = (req, res) => {
  try {
    const fnr = req.query.fnr.toString();
    const mockfile = `${MOCK_DATA_DIR}/sok/fagsaker/fnr-${fnr}.json`;
    if (fs.existsSync(mockfile)) {
      const nyesaker = JSON.parse(fs.readFileSync(mockfile, "utf8"));

      if (nyesaker && nyesaker.length) {
        return res.json(nyesaker);
      }
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.sokFagsakListe = (req, res) => {
  let fagsakListe = [];
  try {
    const mockSokFagsakerDir = `${MOCK_DATA_DIR}/sok/fagsaker/`;
    fs.readdirSync(mockSokFagsakerDir).forEach(file => {
      const fagsaker = JSON.parse(fs.readFileSync(`${mockSokFagsakerDir}/${file}`, 'UTF-8'));
      fagsaker.every((fagsak) => {
        fagsakListe.push(fagsak);
      })
    });
    fagsakListe = _.uniq(fagsakListe.sort((a, b) => {
      return a.saksnummer - b.saksnummer;
    }), true);
    return res.json(fagsakListe);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}