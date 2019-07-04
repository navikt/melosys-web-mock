const Schema = require('../utils/schema-util');

const { lesBucerunderarbeidKatalog, lesMottakerinstitusjonerKatalog } = require('../modules/eessi');

const bucerunderarbeid = lesBucerunderarbeidKatalog();
const mottakerinstitusjoner = lesMottakerinstitusjonerKatalog();

const bucerunderarbeidValidator = Schema.schemaValidator('bucerunderarbeid-schema.json');
const mottakerinstitusjonerValidator = Schema.schemaValidator('mottakerinstitusjoner-schema.json');

const testAll = () => {
  testAllBucerunderarbeid();
  testAllMottakerinstitusjoner();
};

const testOne = (path) => {
  const elem = Schema.lesKatalogElement(path);

  if (path.includes('bucerunderarbeid')) {
    Schema.prettyTittel('Eessi BucerUnderArbeid');
    return Schema.runTest(elem, bucerunderarbeidValidator);
  } else if (path.includes('mottakerinstitusjoner')) {
    Schema.prettyTittel('Eessi Mottakerinstitusjoner');
    return Schema.runTest(elem, mottakerinstitusjonerValidator);
  }

  return false;
};

const testAllBucerunderarbeid = () => {
  Schema.prettyTittel('Eessi BucerUnderArbeid');
  bucerunderarbeid.forEach(el =>
    Schema.runTest(el, bucerunderarbeidValidator)
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

