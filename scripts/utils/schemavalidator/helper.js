const colors = require('colors/safe');
const emoji = require('node-emoji');
const Schema = require('../schema-util');
const ERR = require('../errors');
const Utils = require('../utils');
const { pathObject2Filename } = require('../../utils/pathnames');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const Mock = require('../../utils/mock-util');

module.exports.getFile = async (moduleName, pathObject = {}) => {
  try {
    const GET_DIR = `${MOCK_DATA_DIR}/${moduleName}`;
    let mockfile = `${GET_DIR}/${moduleName}.json5`;
    if (pathObject.pathname) {
      const filename = pathObject2Filename(pathObject, '-');
      mockfile = `${GET_DIR}/${filename}.json5`;
    }
    return await Utils.readJsonAndParseAsync(mockfile);
  }
  catch(err) {
    console.error(err)
  }
};

module.exports.validateReqBody = (moduleName, req, res, schemaNavn, label) => {
  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    if (!valid) return valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};

const humanReadableErrors = (allErrors = []) => {
  return allErrors.map(singleError => {
    const { keyword = '', dataPath = '', params = {}, message = '' } = singleError;
    const { additionalProperty } = params;
    const baseText = `[${colors.bgMagenta(keyword.toUpperCase())}] ${dataPath}: ${message}`;
    return additionalProperty ? `${baseText}: '${colors.bgRed(additionalProperty)}'` : baseText;
  })
};

const valideringFeil = (req, res) => {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
};
module.exports.valideringFeil = valideringFeil;

module.exports.humanReadableErrors = humanReadableErrors;

const test = (label, schemaNavn, data) => {
  if (!label) {
    console.log(colors.bgYellow('schema:test, mangler label'));
    return false;
  }
  if (!schemaNavn) {
    console.log(colors.bgYellow('schema:test, mangler schemaNavn'));
    return false;
  }
  const validate = Schema.schemaValidator(schemaNavn);
  const valid = validate(data);

  if (valid) {
    console.log(emoji.get('white_check_mark'), `[POST] ${label}`);
  }
  else {
    console.dir(validate.errors);
    const errmsgs = humanReadableErrors(validate.errors);
    console.log(emoji.get('x'),`${label}`, colors.bgRed(`Invalid post.body:`));
    errmsgs.forEach((msg) => {console.log(' ',msg)});
  }
  return valid;
};
module.exports.test = test;
