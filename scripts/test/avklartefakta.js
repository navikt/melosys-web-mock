const Ajv = require('ajv');

const Schema = require('../utils/schema-util');
const { lesAvklartefaktaKatalog, lesAvklartefaktaPostMock } = require('../modules/avklartefakta');

const schemaValidator = () => {
  const schema = Schema.lesSchemaFileSync('avklartefakta-schema.json');
  const definitions_avklartefakta_schema = Schema.lesSchemaFileSync('definitions-avklartefakta-schema.json');
  const ajv = new Ajv({allErrors: true});
  return ajv.addSchema(definitions_avklartefakta_schema).compile(schema);
};

const testAvklaringPost = () => {
  Schema.prettyTittel('Avklartefakta/post');
  const elem = lesAvklartefaktaPostMock();
  const validate = schemaValidator();
  return Schema.runTest(elem, validate);
};


const testAll = () => {
  const catalog = lesAvklartefaktaKatalog();
  const validate = schemaValidator();
  Schema.prettyTittel('Avklartefakta');
  catalog.forEach(elem => Schema.runTest(elem, validate));

  testAvklaringPost();
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  const validate = schemaValidator();
  return Schema.runTest(elem, validate);
};

const avklartefakta = {
  testAll,
  testOne,
};
module.exports.avklartefakta = avklartefakta;

