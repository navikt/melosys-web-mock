const Schema = require('../../utils/schema-util');

const Behandlinger = require('../../modules/behandlinger');

const catalog = Behandlinger.lesBehandlingerKatalog();


const validate = Schema.schemaValidator('behandlinger-behandling-schema.json');
const printTitle = () => Schema.prettyTittel('Behandlinger Behandling');

const testAll = () => {
  printTitle();
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const behandling = {
  testAll,
  testOne,
};
module.exports.behandling = behandling;

