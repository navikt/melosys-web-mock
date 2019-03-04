const log4js = require('log4js');
const logger = log4js.getLogger('mock');
const assert = require('assert');
const URL = require('url');
const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const ERR = require('../../utils/errors');
const Utils = require('../../utils/utils');
const Schema = require('../../utils/schema-util');

const happy = require('../../utils/happystatus');
const MOCK_SOK_FAGFSAKER_DIR = `${MOCK_DATA_DIR}/sok/fagsaker`;

module.exports.lesSokFagsakerKatalog = () => {
  return Schema.lesKatalogSync(MOCK_SOK_FAGFSAKER_DIR);
};

const lesFagsakAsync = async (path) => {
  return JSON.parse(await Utils.readFileAsync(path));
};

const lesSokFagsakAsync = async (fnr) => {
  const mockfile = `${MOCK_SOK_FAGFSAKER_DIR}/fnr-${fnr}.json`;
  if (await Utils.existsAsync(mockfile)) {
    return await lesFagsakAsync(mockfile);
  }
  return [];
};

const lesAlleFagsakerAsync = async () => {
  const files = await Utils.readDirAsync(MOCK_SOK_FAGFSAKER_DIR);
  const promises = files.map(async (file) => {
    return await lesFagsakAsync(`${MOCK_SOK_FAGFSAKER_DIR}/${file}`);
  });
  const alleFagsaker = await Promise.all(promises);
  return alleFagsaker.reduce((acc, cur) => {
    if (cur && cur.length) acc.push(...cur);
    return acc;
  }, []);
};

const lesSokFagsakListeAsync = async () => {
  let fagsakListe = await lesAlleFagsakerAsync();
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
module.exports.sok = async (req, res) => {
  try {
    const fnr = req.query.fnr;
    if (fnr) {
      const nyesaker = await lesSokFagsakAsync(fnr);
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
            logger.warn(melding);
            return res.status(status).send(melding);
          }
          case 500: {
            const melding = ERR.serverError500(url.pathname);
            logger.error(melding);
            return res.status(status).send(melding);
          }
        }
      }
    }
    else {
      // const fagsakListe = lesSokFagsakListe();
      const fagsakListe = await lesSokFagsakListeAsync();
      return res.json(fagsakListe);
    }
  } catch (err) {
    console.log(err);
    const melding = ERR.serverError500(req.originalUrl, err);
    res.status(500).send(melding);
  }
};
