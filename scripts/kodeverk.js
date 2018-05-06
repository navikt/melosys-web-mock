
const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const MOCK_DATA_DIR = `${process.cwd()}/mock_data`;

const schemajson = `${MOCK_DATA_DIR}/kodeverk-schema.json`;
const schema = JSON.parse(fs.readFileSync(schemajson, "utf8"));
const validate = ajv.compile(schema);

const dokumentjson = `${MOCK_DATA_DIR}/kodeverk.json`;
const dokument = JSON.parse(fs.readFileSync(dokumentjson, "utf8"));

test(dokument);

function test(data) {
  const valid = validate(data);
  if (valid) console.log('Valid!');
  else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}
