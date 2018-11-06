const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const Lovvalgsperioder = require('../modules/lovvalgsperioder');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/lovvalgsperioder-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const katalog = Lovvalgsperioder.lesLovvalgsperiodersKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Lovvalgsperioder'));
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const lovvalgsperioder = {
  testAll,
  testOne,
};
module.exports.lovvalgsperioder = lovvalgsperioder;

