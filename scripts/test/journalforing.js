const Ajv = require('ajv');

const { MOCK_DATA_DIR, SCHEMA_DIR } = require('../../mock.config');
const Schema = require('../utils/schema-util');

const definitions = Schema.lesSchemaDefinitonsSync();

const MOCK_DATA_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

const testJournalPost = (postnavn) => {
  const postPath = `${MOCK_DATA_JOURNALFORING_DIR}/post/${postnavn}.json`;
  const postSchemaPath = `${SCHEMA_DIR}/journalforing-${postnavn}-schema.json`;

  const elem = Schema.lesKatalogElement(postPath);
  const postSchema = Schema.lesSchemaSync(postSchemaPath);

  const ajv = new Ajv({allErrors: true});
  const postValidator = ajv.addSchema(definitions).compile(postSchema);

  Schema.runTest(elem, ajv, postValidator);
};

const ajv = new Ajv({allErrors: true});
const schema = Schema.lesSchemaFileSync('journalforing-schema.json');
const validate = ajv.addSchema(definitions).compile(schema);

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const testAll = () => {
  Schema.prettyTittel('Journalforing');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_JOURNALFORING_DIR);
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));

  Schema.prettyTittel('Journalforing/post');
  testJournalPost('opprett');
  testJournalPost('tilordne');
};

const journalforing = {
  testOne,
  testAll,
};
module.exports.journalforing = journalforing;
