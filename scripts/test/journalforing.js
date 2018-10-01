const Ajv = require('ajv');
const colors = require('colors/safe');

const Schema = require('./schema-util');

const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const MOCK_DATA_JOURNALFORING_DIR = `${SCRIPTS_DIR}/mock_data/journalforing`;

const testJournalPost = (postnavn) => {
  const postPath = `${MOCK_DATA_JOURNALFORING_DIR}/post/${postnavn}.json`;
  const postSchemaPath = `${SCHEMA_DIR}/journalforing-${postnavn}-schema.json`;

  const elem = Schema.lesKatalogElement(postPath);
  const postSchema = Schema.lesSchemaSync(postSchemaPath);

  const ajv = new Ajv({allErrors: true});
  const postValidator = ajv.compile(postSchema);

  Schema.runTest(elem, ajv, postValidator);
};

const schemajson = `${SCHEMA_DIR}/journalforing-schema.json`;
const schema = Schema.lesSchemaSync(schemajson);
const catalog = Schema.lesKatalogSync(MOCK_DATA_JOURNALFORING_DIR);


const ajv = new Ajv({allErrors: true});
const validate = ajv.compile(schema);

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};
const testAll = () => {
  console.log(colors.blue('Journalforing'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
  console.log(colors.blue(`Journalforing/post`));
  testJournalPost('opprett');
  testJournalPost('tilordne');
};

const journalforing = {
  testOne,
  testAll,
};
module.exports.journalforing = journalforing;
