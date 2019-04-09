const Schema = require('../../utils/schema-util');

const { lesSokOppgaveKatalog} = require('../../modules/oppgaver/sok');

const catalog = lesSokOppgaveKatalog();
const validate = Schema.schemaValidator('oppgaver-sok-schema.json');

const testAll = () => {
  Schema.prettyTittel('Sok Oppgaver');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = path => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const sok = {
  testAll,
  testOne,
};
module.exports.sok = sok;

