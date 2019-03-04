const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../utils/schema-util');

const { lesBehandlingsresultatKatalog } = require('../modules/behandlingsresultat');

const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('behandlingsresultat-schema.json');
const catalog = lesBehandlingsresultatKatalog();

const validate = ajv.addSchema(definitions).compile(schema);

const testAll = () => {
  Schema.prettyTittel('Behandlingsresultat');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const behandlingsresultat = {
  testAll,
  testOne,
};

module.exports.behandlingsresultat = behandlingsresultat;

