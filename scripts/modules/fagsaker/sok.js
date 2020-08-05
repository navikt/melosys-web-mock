const SchemaValidator  = require('../../utils/schemavalidator');
const Katalog = require('../../katalog');
const Utils = require('../../utils/utils');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const { moduleName } = Katalog.pathnameMap['fagsaker-sok'];

const SOK_DATA_DIR = `${MOCK_DATA_DIR}/${moduleName}`;

const lesSokResultat = async id => {
  const mockfile = `${SOK_DATA_DIR}/sok-fnr-${id}.json5`;

  try {
    const sokResultat = await Utils.readJsonAndParseAsync(mockfile);
    return sokResultat;
  } catch (e) {
    return [];
  }
};

module.exports.sokFagsak = async (req, res) => {
  const { ident, saksnummer } = req.body;

  const sokResultat = await lesSokResultat(ident || saksnummer);

  SchemaValidator.post(moduleName, req, res, sokResultat);
};
