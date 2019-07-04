const Schema = require('../../utils/schema-util');

const { lesOppgaveKatalog } = require('../../modules/oppgaver');

const catalog = lesOppgaveKatalog();

const testAll = () => {
  Schema.prettyTittel('Oppgaver');
  catalog.forEach((elem) => {
    const { navn } = elem;
    const fornavn = navn.split('.')[0];
    const schemanavn = `oppgaver-${fornavn}-schema.json`;
    const validate = Schema.schemaValidator(schemanavn);
    Schema.runTest(elem, validate);
  });
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  const validate = Schema.schemaValidator(path);
  return Schema.runTest(elem, validate);
};

const oppgaver = {
  testAll,
  testOne,
};
module.exports.oppgaver = oppgaver;
