const { MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');
const Mock = require('../utils/mock-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');
const Katalog = require('../katalog');

const lesLovvalgsperioder = (behandlingID) => {
  const { moduleName } = Katalog.pathnameMap.lovvalgsperioder;
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const mockfile = `${GET_DIR}/lovvalgsperiode-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};
const lesOpprinneligPeriode = (behandlingID) => {
  const { moduleName } = Katalog.pathnameMap['lovvalgsperioder-opprinnelig'];
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const mockfile = `${GET_DIR}/opprinneligPeriode-bid-${behandlingID}.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

/**
 * Hent lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.hent = async (req, res) => {
  try {
    const { behandlingID} = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const data = await lesLovvalgsperioder(behandlingID);
    return res.json(data);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};

/**
 * Send lovvalgsperioder
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.send = (req, res) => {
  const { moduleName } = Katalog.pathnameMap.lovvalgsperioder;
  const { behandlingID } = req.params;
  if (!behandlingID) return Mock.manglerParamBehandlingsID(req, res);
  SchemaPostValidator.post(moduleName, req, res);
};

module.exports.opprinnelig = async (req, res) => {
  try {
    const { behandlingID} = req.params;
    if (!behandlingID) {
      return Mock.manglerParamBehandlingsID(req, res);
    }
    const data = await lesOpprinneligPeriode(behandlingID);
    return res.json(data);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
