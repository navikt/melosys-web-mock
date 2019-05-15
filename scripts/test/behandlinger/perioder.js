const Schema = require('../../utils/schema-util');

const Behandlinger = require('../../modules/behandlinger');

const catalog = Behandlinger.lesBehandlingsPerioderKatalog();


const validate = Schema.schemaValidator('behandlinger-perioder-schema.json');
const printTitle = () => Schema.prettyTittel('Behandlinger Perioder');

const testAll = () => {
  printTitle();
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const perioder = {
  testAll,
  testOne,
};
module.exports.perioder = perioder;

