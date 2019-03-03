const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../utils/schema-util');
const { lesAvklartefaktaKatalog, lesAvklartefaktaPostMock } = require('../modules/avklartefakta');

const testAvklaringPost = () => {
  Schema.prettyTittel('Avklartefakta/post');
  const elem = lesAvklartefaktaPostMock();
  const validate = schemaValidator();
  return Schema.runTest(elem, ajv, validate);
};

const schemaValidator = () => {
  const schema = Schema.lesSchemaFileSync('avklartefakta-schema.json');
  return ajv.compile(schema);
};

const testAll = () => {
  const catalog = lesAvklartefaktaKatalog();
  const validate = schemaValidator();
  Schema.prettyTittel('Avklartefakta');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));

  testAvklaringPost();
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  const validate = schemaValidator();
  return Schema.runTest(elem, ajv, validate);
};

const avklartefakta = {
  testAll,
  testOne,
};
module.exports.avklartefakta = avklartefakta;

