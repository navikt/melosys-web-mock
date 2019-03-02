const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('./schema-util');
const { lesSoknadKatalog } = require('../modules/soknader');

const definitions = Schema.lesSchemaDefinitonsSync();

const schema = Schema.lesSchemaFileSync('/soknad-schema.json');
const katalog = lesSoknadKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Soknad');
  katalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const soknad = {
  testAll,
  testOne,
};
module.exports.soknad = soknad;

