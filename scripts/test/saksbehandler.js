const Schema = require('../utils/schema-util');
const { lesSaksbehandlerKatalog } = require('../modules/saksbehandler');

const catalog = lesSaksbehandlerKatalog();
const validate = Schema.schemaValidator('saksbehandler-schema.json');

const testAll = () => {
  Schema.prettyTittel('Saksbehandler');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const Saksbehandler = {
  testAll,
  testOne,
};
module.exports.Saksbehandler = Saksbehandler;

