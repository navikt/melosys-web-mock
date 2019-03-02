const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const { SCHEMA_DIR } = require('../../mock.config');
const Schema = require('./schema-util');
const { lesAvklartefaktaKatalog, lesAvklartefaktaPostMock } = require('../modules/avklartefakta');

const testAvklaringPost = () => {
  const postSchemaPath = `${SCHEMA_DIR}/avklartefakta-schema.json`;

  const elem = lesAvklartefaktaPostMock();
  const postSchema = Schema.lesSchemaSync(postSchemaPath);

  const ajv = new Ajv({allErrors: true});
  const postValidator = ajv.compile(postSchema);

  Schema.runTest(elem, ajv, postValidator);
};

const schemapath = `${SCHEMA_DIR}/avklartefakta-schema.json`;
const schema = Schema.lesSchemaSync(schemapath);

const catalog = lesAvklartefaktaKatalog();

const validate = ajv.compile(schema);


const testAll = () => {
  Schema.prettyTittel('Avklartefakta');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
  Schema.prettyTittel('Avklartefakta/post');
  testAvklaringPost();
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const avklartefakta = {
  testAll,
  testOne,
};
module.exports.avklartefakta = avklartefakta;

