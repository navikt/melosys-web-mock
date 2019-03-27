const Ajv = require('ajv');

const { MOCK_DATA_DIR, SCHEMA_DIR } = require('../../mock.config');
const Schema = require('../utils/schema-util');

const MOCK_DATA_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

const schemaValidator = schema => {
  const definitions = Schema.lesSchemaDefinitonsSync();
  const ajv = new Ajv({allErrors: true});
  return ajv.addSchema(definitions).compile(schema);
};

const testJournalPost = (postnavn) => {
  const postPath = `${MOCK_DATA_JOURNALFORING_DIR}/post/${postnavn}.json`;
  const postSchemaPath = `${SCHEMA_DIR}/journalforing-${postnavn}-schema.json`;

  const elem = Schema.lesKatalogElement(postPath);
  const postSchema = Schema.lesSchemaSync(postSchemaPath);

  const postValidator = schemaValidator(postSchema);

  Schema.runTest(elem, postValidator);
};

const schema = Schema.lesSchemaFileSync('journalforing-schema.json');

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  const validate = schemaValidator(schema);
  return Schema.runTest(elem, validate);
};

const testAll = () => {
  Schema.prettyTittel('Journalforing');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_JOURNALFORING_DIR);
  const validate = schemaValidator(schema);
  catalog.forEach(elem => Schema.runTest(elem, validate));

  Schema.prettyTittel('Journalforing/post');
  testJournalPost('opprett');
  testJournalPost('tilordne');
};

const journalforing = {
  testOne,
  testAll,
};
module.exports.journalforing = journalforing;
