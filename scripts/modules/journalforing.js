const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const SchemaPostValidator  = require('../utils/schema-post-validator');

const Mock = require('../utils/mock-util');
const Katalog = require('../katalog');

const lesOppgave = () => { // eslint-disable-line no-unused-vars
  const { moduleName } = Katalog.pathnameMap.journalforing;
  const mockfile = `${MOCK_DATA_DIR}/${moduleName}/DOK_3789-30098000492.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * hent
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.hent = async (req, res) => {
  try {
    const journalpostID = req.params.journalpostID;
    if (!journalpostID) {
      Mock.manglerParamjournalpostID(req, res);
    }
    const journalpost = await lesOppgave(journalpostID);
    return res.json(journalpost);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * sendOpprettNySak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendOpprettNySak = (req, res) => {
  const { moduleName } = Katalog.pathnameMap["journalforing-opprett"];
  SchemaPostValidator.post204(moduleName, req, res);
};

/**
 * sendTilordneSak
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.sendTilordneSak = (req, res) => {
  const { moduleName } = Katalog.pathnameMap["journalforing-tilordne"];
  SchemaPostValidator.post204(moduleName, req, res);
};

