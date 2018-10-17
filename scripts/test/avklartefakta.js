const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

const Schema = require('./schema-util');
const { lesAvklartefaktaKatalog, lesAvklartefaktaPostMock } = require('../modules/avklartefakta');

const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

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
  console.log(colors.blue('Avklartefakta'));
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
  console.log(colors.blue(`Avklartefakta/post`));
  testAvklaringPost();
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  console.log(colors.blue(tittel));
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const avklartefakta = {
  testAll,
  testOne,
};
module.exports.avklartefakta = avklartefakta;

