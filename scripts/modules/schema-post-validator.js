const Ajv = require('ajv');
const colors = require('colors/safe');
const ERR = require('./errors');
const Schema = require('../test/schema-util');

const SCRIPTS_DATA_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DATA_DIR}/schema`;
const definitionsPath = `${SCHEMA_DIR}/definitions-schema.json`;
const definitions = Schema.lesSchemaSync(definitionsPath);

module.exports.valideringFeil = (req, res) => {
  const status = 400;
  const melding = ERR.errorMessage(400,'Bad Request', 'Invalid schema', req.originalUrl);
  res.status(status).send(melding);
};

module.exports.test = (label, schema, data) => {
  if (!label) {
    console.log(colors.bgYellow('schema:test, mangler label'));
    return false;
  }
  if (!schema) {
    console.log(colors.bgYellow('schema:test, mangler schema'));
    return false;
  }

  const ajv = new Ajv({allErrors: true});
  const validate = ajv.addSchema(definitions).compile(schema);
  const valid = validate(data);

  if (valid) {
    console.log(`${label}`, colors.bgGreen('Valid!'));
  }
  else {
    const ajvErrors = ajv.errorsText(validate.errors);
    console.log(`${label}`, colors.bgRed(`Invalid post.body: ${ajvErrors}`));
  }
  return valid;
};
