const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const cwd = process.cwd();
const SCRIPTS_DIR = cwd.endsWith('scripts') ? cwd : `${cwd}/scripts`;

const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SOKNADER_MOCK_DIR = `${MOCK_DATA_DIR}/soknader`;

const schemajson = `${SOKNADER_MOCK_DIR}/soknad-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const validate = ajv.compile(schema);

const dokumentjson = `${SOKNADER_MOCK_DIR}/soknad-bid-4.json`;
const dokument = JSON.parse(fs.readFileSync(dokumentjson, "utf8"));

test(dokument);

function test(data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}
