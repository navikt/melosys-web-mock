const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../../utils/schema-util');
const schema = Schema.lesSchemaFileSync('kontaktopplysninger-post-schema.json');

const Fagsaker = require('../../modules/fagsaker');
const catalog = Fagsaker.lesKontaktopplysningerKatalog();

const validate = ajv.compile(schema);
const printTitle = () => Schema.prettyTittel('Fagsaker Kontaktopplysninger');

const testAll = () => {
  printTitle();
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const kontaktopplysninger = {
  testAll,
  testOne,
};
module.exports.kontaktopplysninger = kontaktopplysninger;
