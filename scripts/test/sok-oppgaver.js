const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const Schema = require('../utils/schema-util');

const { lesSokOppgaveKatalog} = require('../modules/sok-oppgaver');

const definitions = Schema.lesSchemaDefinitonsSync();
const schema = Schema.lesSchemaFileSync('oppgaver-sok-schema.json');
const catalog = lesSokOppgaveKatalog();

const validate = ajv.addSchema(definitions).compile(schema);


const testAll = () => {
  Schema.prettyTittel('Sok Oppgaver');
  catalog.forEach((elem) => Schema.runTest(elem, ajv, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, ajv, validate);
};

const SokOppgaver = {
  testAll,
  testOne,
};
module.exports.SokOppgaver = SokOppgaver;

