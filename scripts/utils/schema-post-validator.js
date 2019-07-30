const Ajv = require('ajv');
const colors = require('colors/safe');
const emoji = require('node-emoji');

const ERR = require('./errors');
const Mock = require('./mock-util');
const Utils = require('./utils');

const Schema = require('./schema-util');
const definitions = Schema.lesSchemaDefinitonsSync();

const valideringFeil = (req, res) => {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
};
module.exports.valideringFeil = valideringFeil;

const humanReadableErrors = (allErrors = []) => {
  return allErrors.map(singleError => {
    const { keyword = '', dataPath = '', params = {}, message = '' } = singleError;
    const { additionalProperty } = params;
    const baseText = `[${colors.bgMagenta(keyword.toUpperCase())}] ${dataPath}: ${message}`;
    return additionalProperty ? `${baseText}: '${colors.bgRed(additionalProperty)}'` : baseText;
  })
};
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
module.exports.post = (moduleName, req, res, customResponse = null) => {
  const schemaNavn = `${moduleName}-post-schema.json`;
  const label = `${moduleName}:send`;

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    const response = customResponse ? customResponse : jsBody;
    return valid ? res.json(response) : valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
module.exports.post204 = (moduleName, req, res) => {
  const schemaNavn = `${moduleName}-post-schema.json`;
  const label = `${moduleName}:send`;

  try {
    const body = req.body;
    const jsBody = Utils.isJSON(body) ? JSON.parse(body) : body;
    const valid = test(label, schemaNavn, jsBody);
    return valid ? res.status(204).json() : valideringFeil(req, res);
  }
  catch(err) {
    Mock.serverError(req, res, err);
  }
};
module.exports.testAsync = async (label, schema, data) => {
  if (!label) {
    console.log(colors.bgYellow('schema:test, mangler label'));
    return false;
  }
  if (!schema) {
    console.log(colors.bgYellow('schema:test, mangler schema'));
    return false;
  }

  const ajv = new Ajv({allErrors: true});
  require('ajv-async')(ajv);
  const validate = ajv.addSchema(definitions).compile(schema);
  const valid = await validate(data);

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
