const Schema = require('../../utils/schema-util');
const Behandlinger = require('../../modules/behandlinger');

const catalog = Behandlinger.lesBehandlingsresultatKatalog();

const validate = Schema.schemaValidator('behandlingsresultat-schema.json');

const testAll = () => {
  Schema.prettyTittel('Behandlingsresultat');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const behandlingsresultat = {
  testAll,
  testOne,
};

module.exports.behandlingsresultat = behandlingsresultat;
