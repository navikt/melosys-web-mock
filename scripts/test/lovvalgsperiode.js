const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const Lovvalgsperiode = require('../modules/lovvalgsperiode');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/lovvalgsperiode-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const katalog = Lovvalgsperiode.lesLovvalgsperiodesKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  console.log(colors.blue('Lovvalgsperiode'));
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const lovvalgsperiode = {
  testAll,
  testOne,
};
module.exports.lovvalgsperiode = lovvalgsperiode;

