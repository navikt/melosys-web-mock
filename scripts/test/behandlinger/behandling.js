const Schema = require('../../utils/schema-util');
const { lesBehandlingKatalog } = require('../../modules/behandlinger/behandling');

const catalog = lesBehandlingKatalog();

const validate = Schema.schemaValidator('behandling-schema.json');

const testAll = () => {
  Schema.prettyTittel('Behandling');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const behandling = {
  testAll,
  testOne,
};

module.exports.behandling = behandling;

