const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');
const Lovvalgsperioder = require('../modules/lovvalgsperioder');

const schemajson = `${SCHEMA_DIR}/lovvalgsperioder-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const katalog = Lovvalgsperioder.lesLovvalgsperiodersKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  Schema.prettyTittel('Lovvalgsperioder');
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const lovvalgsperioder = {
  testAll,
  testOne,
};
module.exports.lovvalgsperioder = lovvalgsperioder;

