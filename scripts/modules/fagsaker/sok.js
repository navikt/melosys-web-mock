const assert = require('assert');
const _ = require('lodash');

const { MOCK_DATA_DIR } = require('../../../mock.config');
const Mock = require('../../utils/mock-util');
const Utils = require('../../utils/utils');

const MOCK_FAGFSAKER_SOK_DIR = `${MOCK_DATA_DIR}/fagsaker-sok`;

const lesFagsakAsync = (path) => {
  return Utils.readJsonAndParseAsync(path);
};

const lesSokFagsakAsync = async (fnr) => {
  const mockfile = `${MOCK_FAGFSAKER_SOK_DIR}/fnr-${fnr}.json`;
  if (await Utils.existsAsync(mockfile)) {
    return await lesFagsakAsync(mockfile);
  }
  return [];
};

const lesAlleFagsakerAsync = async () => {
  const files = await Utils.readDirAsync(MOCK_FAGFSAKER_SOK_DIR);
  const promises = files.map(async (file) => {
    return await lesFagsakAsync(`${MOCK_FAGFSAKER_SOK_DIR}/${file}`);
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
module.exports.sokFagsak = async (req, res) => {
  try {
    const fnr = req.query.fnr;
    if (fnr) {
      const nyesaker = await lesSokFagsakAsync(fnr);
      if (nyesaker && nyesaker.length) {
        return res.json(nyesaker);
      }
      const tom_soknad = [];
      return res.json(tom_soknad);
    }
    else {
      // const fagsakListe = lesSokFagsakListe();
      const fagsakListe = await lesSokFagsakListeAsync();
      return res.json(fagsakListe);
    }
  } catch (err) {
    Mock.serverError(req, res, err);
  }
};
