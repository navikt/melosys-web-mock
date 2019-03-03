const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../utils/schema-util');

const { lesInngangKatalog } = require('../modules/inngang');

const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('inngang-schema.json');
const catalog = lesInngangKatalog();

const validate = ajv.addSchema(definitions).compile(schema);


const testAll = () => {
  Schema.prettyTittel('Inngang');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const inngang = {
  testAll,
  testOne,
};
module.exports.inngang = inngang;

