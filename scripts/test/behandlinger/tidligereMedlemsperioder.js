const Schema = require('../../utils/schema-util');

const Behandlinger = require('../../modules/behandlinger');

const catalog = Behandlinger.lesTidligereMedlemsPerioderKatalog();


const validate = Schema.schemaValidator('behandlinger-perioder-schema.json');
const printTitle = () => Schema.prettyTittel('Behandlinger Tidligere MedlemsPerioder');

const testAll = () => {
  printTitle();
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const tidligereMedlemsPerioder = {
  testAll,
  testOne,
};
module.exports.tidligereMedlemsPerioder = tidligereMedlemsPerioder;

