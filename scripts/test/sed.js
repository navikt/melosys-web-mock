const Schema = require('../utils/schema-util');

const { lesSedunderarbeidKatalog, lesMottakerinstitusjonerKatalog } = require('../modules/sed');

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
    Schema.prettyTittel('Sed SedUnderArbeid');
    return Schema.runTest(elem, sedunderarbeidValidator);
  } else if (path.includes('mottakerinstitusjoner')) {
    Schema.prettyTittel('Sed Mottakerinstitusjoner');
    return Schema.runTest(elem, mottakerinstitusjonerValidator);
  }

  return false;
};

const testAllSedunderarbeid = () => {
  Schema.prettyTittel('Sed SedUnderArbeid');
  sedunderarbeid.forEach(el =>
    Schema.runTest(el, sedunderarbeidValidator)
  );
};

const testAllMottakerinstitusjoner = () => {
  Schema.prettyTittel('Sed Mottakerinstitusjoner');
  mottakerinstitusjoner.forEach(el =>
    Schema.runTest(el, mottakerinstitusjonerValidator)
  );
};

const sed = {
  testAll,
  testOne,
};
module.exports.sed = sed;

