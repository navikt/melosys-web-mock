const Schema = require('../utils/schema-util');
const { lesAvklartefaktaKatalog, lesAvklartefaktaPostMock } = require('../modules/avklartefakta');

const validate = Schema.schemaValidator('avklartefakta-schema.json');
const testAvklaringPost = () => {
  Schema.prettyTittel('Avklartefakta/post');
  const elem = lesAvklartefaktaPostMock();
  return Schema.runTest(elem, validate);
};

const testAll = () => {
  const catalog = lesAvklartefaktaKatalog();
  Schema.prettyTittel('Avklartefakta');
  catalog.forEach(elem => Schema.runTest(elem, validate));

  testAvklaringPost();
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const avklartefakta = {
  testAll,
  testOne,
};
module.exports.avklartefakta = avklartefakta;

