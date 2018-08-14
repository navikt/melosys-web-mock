const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const fs = require('fs');

const Soknader = require('../modules/soknader');
const SCRIPTS_DIR =`${process.cwd()}/scripts`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

const schemajson = `${SCHEMA_DIR}/soknad-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const dokumenter = Soknader.lesAlleSoknader();

const validate = ajv.compile(schema);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    console.log('Soknad Valid!');
    return 0;
  }
  else {
    console.log('Invalid: ' + ajv.errorsText(validate.errors));
    return -1;
  }
}
const test = () => {
  dokumenter.every((document) => runTest(document));
};

const soknad = {
  test,
};
exports.soknad = soknad;

