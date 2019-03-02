//const { getInstalledPathSync } = require('get-installed-path');

//const SCRIPTS_DIR = getInstalledPathSync('melosys-schema', { local: true });
const SCRIPTS_DIR = `${process.cwd()}/scripts`;
const MOCK_DATA_DIR = `${SCRIPTS_DIR}/mock_data`;
const SCHEMA_DIR = `${SCRIPTS_DIR}/schema`;

module.exports = {
  SCRIPTS_DIR,
  MOCK_DATA_DIR,
  SCHEMA_DIR,
};

