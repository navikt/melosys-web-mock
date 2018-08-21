const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesFaktaavklaringKatalog } = require('../modules/faktaavklaring');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemapath = `${SCHEMA_DIR}/faktaavklaring-schema.json`;
const schema = Schema.lesSchema(schemapath);

const catalog = lesFaktaavklaringKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Faktaavklaring'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const faktaavklaring = {
  testAll,
  testOne,
};
module.exports.faktaavklaring = faktaavklaring;

