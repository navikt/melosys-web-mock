const Schema = require('../utils/schema-util');

const { lesSedunderarbeidKatalog, lesMottakerinstitusjonerKatalog } = require('../modules/eessi');

const sedunderarbeid = lesSedunderarbeidKatalog();
const mottakerinstitusjoner = lesMottakerinstitusjonerKatalog();

const sedunderarbeidValidator = Schema.schemaValidator('sedunderarbeid-schema.json');
const mottakerinstitusjonerValidator = Schema.schemaValidator('mottakerinstitusjoner-schema.json');

const testAll = () => {
  testAllSedunderarbeid();
  testAllMottakerinstitusjoner();
};

const testOne = (path) => {
  const elem = Schema.lesKatalogElement(path);

  if (path.includes('sedunderarbeid')) {
    Schema.prettyTittel('Eessi SedUnderArbeid');
    return Schema.runTest(elem, sedunderarbeidValidator);
  } else if (path.includes('mottakerinstitusjoner')) {
    Schema.prettyTittel('Eessi Mottakerinstitusjoner');
    return Schema.runTest(elem, mottakerinstitusjonerValidator);
  }

  return false;
};

const testAllSedunderarbeid = () => {
  Schema.prettyTittel('Eessi SedUnderArbeid');
  sedunderarbeid.forEach(el =>
    Schema.runTest(el, sedunderarbeidValidator)
  );
};

const testAllMottakerinstitusjoner = () => {
  Schema.prettyTittel('Eessi Mottakerinstitusjoner');
  mottakerinstitusjoner.forEach(el =>
    Schema.runTest(el, mottakerinstitusjonerValidator)
  );
};

const eessi = {
  testAll,
  testOne,
};
module.exports.eessi = eessi;

