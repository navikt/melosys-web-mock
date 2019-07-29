const SchemaPostValidator  = require('../../utils/schema-post-validator');
const Mock = require('../../utils/mock-util');
const Katalog = require('../../katalog');
const Utils = require('../../utils/utils');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const { moduleName } = Katalog.pathnameMap["eessi-bucer"];

module.exports.hentBucerUnderArbeid = async (req, res) => {
  const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  try {
    const mockfile = `${GET_DIR}/${moduleName}.json`;
    const mockData = await Utils.readJsonAndParseAsync(mockfile);

    return res.json(mockData);
  }
  catch (err) {
    Mock.serverError(req, res, err);
  }
};
/**
 * status
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.opprett = (req, res) => {
  const { behandlingID } = req.params;
  if (!behandlingID) {
    return Mock.manglerParamBehandlingsID(req, res);
  }
  const rinaUrl = { rinaUrl: 'https://rina-oppl-utv004.adeo.no/portal/#/caseManagement/226792' };
  SchemaPostValidator.post(moduleName, req, res, rinaUrl);
};
