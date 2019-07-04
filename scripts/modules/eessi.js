const log4js = require('log4js');
const logger = log4js.getLogger('mock');

const Mock = require('../utils/mock-util');
const Schema = require('../utils/schema-util');
const SchemaPostValidator  = require('../utils/schema-post-validator');
const {  MOCK_DATA_DIR } = require('../../mock.config');
const Utils = require('../utils/utils');

const MOCK_EESSI_DATA_DIR = `${MOCK_DATA_DIR}/eessi`;

const lesMottakerinstitusjoner = () => {
  const mockfile = `${MOCK_EESSI_DATA_DIR}/mottakerinstitusjoner/mottakerinstitusjoner.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

module.exports.lesMottakerinstitusjonerKatalog = () => {
  return Schema.lesKatalogSync(`${MOCK_EESSI_DATA_DIR}/mottakerinstitusjoner`);
};

module.exports.mottakerinstitusjoner = async (req, res) => {
  try {
    const info = await lesMottakerinstitusjoner();
    res.json(info);
  } catch (err) {
    Mock.serverError(req, res, err);
  }
};

module.exports.opprettbuc = async (req, res) => {
  const schemaNavn = 'opprettbuc-post-schema.json';
  const label = 'Eessi:opprettbuc';

  try {
    const body = req.body;
    const jsonData = Utils.isJSON(body) ? JSON.parse(body) : body;
    logger.debug(label, JSON.stringify(jsonData));
    const valid = SchemaPostValidator.test(label, schemaNavn, jsonData);
    return valid ? res.json('localhost:3000') : SchemaPostValidator.valideringFeil(req, res);
  } catch (err) {
    Mock.serverError(req, res, err);
  }
};

const lesBucerunderarbeid = () => {
  const mockfile = `${MOCK_EESSI_DATA_DIR}/bucerunderarbeid/bucerunderarbeid.json`;
  return Utils.readJsonAndParseAsync(mockfile);
};

module.exports.lesBucerunderarbeidKatalog = () => {
  return Schema.lesKatalogSync(`${MOCK_EESSI_DATA_DIR}/bucerunderarbeid`);
};

module.exports.bucerunderarbeid = async (req, res) => {
  try {
    const info = await lesBucerunderarbeid();
    res.json(info);
  } catch (err) {
    Mock.serverError(req, res, err);
  }
};
