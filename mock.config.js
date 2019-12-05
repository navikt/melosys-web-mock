const { getInstalledPathSync } = require('get-installed-path');

const SCRIPTS_DIR = getInstalledPathSync('@navikt/melosys-schema', { local: true });

const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;
const DEFINITION_SCHEMA = `${SCHEMA_DIR}/definitions-schema.json`;
const API_BASE_URL = 'http://localhost:3002/api';

module.exports = {
  SCRIPTS_DIR,
  MOCK_DATA_DIR,
  SCHEMA_DIR,
  DEFINITION_SCHEMA,
  API_BASE_URL,
};

